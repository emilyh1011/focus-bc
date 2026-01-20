import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { TbDoorExit } from "react-icons/tb";
import { Users, ExternalLink, Link2, X } from "lucide-react";
import { WiStars } from "react-icons/wi";
import Switch from "@mui/material/Switch";
import normalizeUrl from "normalize-url";
import BlockInputSection from "./BlockInputSection";
import { use } from "react";

function SoloSession({ setSessionState, config, setConfig, defaultConfig }) {
    
    const currentUser = useContext(CurrentUserContext);
    
    const [hBlockInput, setHBlockInput] = useState("");
    const [hBlockMessage, setHBlockMessage] = useState(null);

    //Set to a normalized link if normalizedurl hBlockInput not valid or not reachable
    //So, we will display a popup to ask user if they still want to add this input
    const [hardblocks, setHardblocks] = useState([]);
    const [sNudgeInput, setSNudgeInput] = useState("");
    const [softnudges, setSoftnudges] = useState([]);
    const [sNudgeMessage, setSNudgeMessage] = useState(null);

    const [duplicateInSN, setDuplicateInSN] = useState(null);
    const [duplicateInHB, setDuplicateInHB] = useState(null);

    function handleEndSession() {
        //Reset everything
        setSessionState('recap');
        setHardblocks([]);
        setSoftnudges([]);
        setHBlockInput("");
        setSNudgeInput("");
        setDuplicateInHB(null);
        setDuplicateInSN(null);
    }

    async function checkURLReachable(u) {

        try {
            const response = await fetch("http://localhost:3000/checkURLReachable", {
                method: "POST",
                body: JSON.stringify({ url: u }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                //Site doesn't seem to be reachable, need to ask user if they still want to add
                return { reachable: false, status: null, message: "The site doesn't seem to respond. Add anyways?" };
            }

            const result = await response.json();
            return result;

        } catch (err) {
            return { reachable: false, status: null, message: "Server down, CORS Issue, or Network Issue. Add anyways?" };
        }

    }

    async function handleAddHardBlockSoftNudge(e, isHardBlock) {
        e.preventDefault();

        let result;

        //Reset previous duplicate messages
        setDuplicateInHB(null);
        setDuplicateInSN(null);

        //Try to validate link
        //Normalize link first, then check if normalized URL is reachable
        //npm install normalize-url
        let rawInput;
        if (isHardBlock) {
            rawInput = hBlockInput.trim();
        } else {
            rawInput = sNudgeInput.trim();
        }

        if (!rawInput) {
            //Falsy input string, user didn't enter a valid input, return
            return;
        }

        const normalized = normalizeUrl(rawInput,
            {
                defaultProtocol: 'https',
                stripWWW: false,        // up to you if you want to keep/remove
                removeTrailingSlash: true,
            });

        const normalizedUrlObject = new URL(normalized);

        if (!["https:", "http:"].includes(normalizedUrlObject.protocol)) {
            //Unsupported protocol, not reachable link
            result = { reachable: false };
            isHardBlock ? setHBlockMessage({ normalized: normalized }) : setSNudgeMessage({ normalized: normalized });
            return;
        }

        if (!normalizedUrlObject.hostname) {
            //NO hostname exists; ex:https://www.youtube.com/testVideo, hostName: www.youtube.com
            //Not reachable link
            result = { reachable: false }
            isHardBlock ? setHBlockMessage({ normalized: normalized }) : setSNudgeMessage({ normalized: normalized });
            return;
        }

        //valid normalized URL, 
        //Check if its a duplicate now, & make sure don't add 
        if (isHardBlock) {
            //Duplicate in self, don't add
            if (hardblocks.includes(normalized)) {
                setHBlockInput("");
                return;
            }
            //Already in other, don't add to both
            if (softnudges.includes(normalized)) {
                setDuplicateInSN({ normalized: normalized });
                return;
            }
        } else {
            if (softnudges.includes(normalized)) {
                setSNudgeInput("");
                return;
            }
            //Already in other, don't add to both
            if (hardblocks.includes(normalized)) {
                setDuplicateInHB({ normalized: normalized });
                return;
            }
        }

        // Valid and not a duplicate, check if its reachable now
        result = await checkURLReachable(normalized);

        console.log("i tried to add ", hBlockInput, " Normalized Link: ", normalized);
        console.log("this link return message", result);
        console.log("i tried to add ", sNudgeInput, " Normalized Link: ", normalized);
        console.log("this link return message", result);


        if (result.reachable) {
            if (isHardBlock) {
                console.log("i added link sucessfully to hardblocks");
                console.log("my new hardblocks", hardblocks, normalized);
                setHardblocks([...hardblocks, normalized]);
                setHBlockInput("");
            } else {
                console.log("i added link sucessfully to softnudges");
                console.log("my new softnudges", softnudges, normalized);
                setSoftnudges([...softnudges, normalized]);
                setSNudgeInput("");
            }
        } else {
            //Ask user if they still want to add
            isHardBlock ? setHBlockMessage({ normalized: normalized }) : setSNudgeMessage({ normalized: normalized });
        }

    }

    return (
        <div className="flex h-[calc(100vh-4rem)] gap-4 overflow-hidden bg-zinc-900 p-4 relative">


            <div className="flex flex-col w-full h-full items-center bg-zinc-900 gap-4 overflow-hidden bg-zinc-900 p-4" >
                {/**Header */}
                <header className="flex flex-col w-full">
                    <h2 className="text-lg font-medium text-white">{currentUser.firstName}'s Solo Focus Room</h2>

                    <div className="flex gap-2">
                        <div className="flex items-center gap-1 text-sm text-slate-200">
                            <Users size={14} />
                            <span>1/1</span>
                        </div>
                        {config.isAI ? <div className="flex items-center gap-1 text-sm text-slate-200">
                            <WiStars size={20} />
                            <span>AI Assisted</span>
                        </div> : null}
                    </div>

                </header>


                {/**user's camera */}
                <div className="h-full w-full max-h-5/6">
                    <div className="w-full h-full bg-zinc-800 rounded-xl shadow-sm overflow-hidden aspect-video flex items-center justify-center relative">

                        <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                            {currentUser.firstName} {currentUser.lastName}
                        </div>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="flex w-full items-center">

                    <div className="flex justify-center gap-2 flex-1">

                        {/* Leave */}
                        <button
                            type="button"
                            className=" inline-flex items-center justify-center
                            rounded-full
                            text-sm font-medium
                            transition
                            shadow-sm h-10 w-10 bg-zinc-700 text-red-500 hover:cursor-pointer hover:text-white hover:bg-red-500 hover:duration-150"
                            onClick={handleEndSession}
                        >
                            <TbDoorExit size={16} />
                        </button>
                    </div>


                </div>
            </div>

            {hBlockMessage ?
                <div className="flex flex-col gap-2 border border-white w-1/8 absolute right-2/7 top-1/2 z-50 bg-white p-4 rounded-lg">
                    <span className="text-sm font-md text-slate-900">The normalized site link <span className="italic text-sky-400 opacity-70">{hBlockMessage.normalized}</span> doesn't seem to respond.</span>
                    <span className="text-sm font-md text-slate-900">Add anyways?</span>
                    <div className="flex gap-2">
                        <button className="text-sm font-semibold bg-black rounded-md px-3 py-1 text-white hover:cursor-pointer active:border active:border-blue-1 active:duration-150"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setHBlockMessage(null);
                                setHardblocks([...hardblocks, hBlockMessage.normalized])
                                setHBlockInput("");
                            }} >Yes</button>
                        <button className="text-sm font-semibold rounded-md px-3 py-1 transition duration-150 hover:cursor-pointer hover:duration-150 hover:bg-slate-50 active:bg-slate-100 active:duration-150"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setHBlockMessage(null);
                                setHBlockInput("");
                            }}>No</button>
                    </div>
                </div> : null}

            {sNudgeMessage ?
                <div className="flex flex-col gap-2 border border-white w-1/8 absolute right-2/7 top-4/6 z-50 bg-white p-4 rounded-lg">
                    <span className="text-sm font-md text-slate-900">The normalized site link <span className="italic text-sky-400 opacity-70">{sNudgeMessage.normalized}</span> doesn't seem to respond.</span>
                    <span className="text-sm font-md text-slate-900">Add anyways?</span>
                    <div className="flex gap-2">
                        <button className="text-sm font-semibold bg-black rounded-md px-3 py-1 text-white hover:cursor-pointer active:border active:border-blue-1 active:duration-150"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSNudgeMessage(null);
                                setSoftnudges([...softnudges, sNudgeMessage.normalized])
                                setSNudgeInput("");
                            }} >Yes</button>
                        <button className="text-sm font-semibold rounded-md px-3 py-1 transition duration-150 hover:cursor-pointer hover:duration-150 hover:bg-slate-50 active:bg-slate-100 active:duration-150"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSNudgeMessage(null);
                                setSNudgeInput("");
                            }}>No</button>
                    </div>
                </div> : null}

            {/* Focus Sidebar */}

            <div className="rounded-xl border border-zinc-100 bg-white shadow-sm backdrop-blur flex w-6/16 flex-col py-4 px-2 gap-2 overflow-y-auto">

                <div className="border-b border-slate-200 pb-2 px-2 font-semibold">
                    <span>Focus Board</span>
                </div>


                <div className="flex flex-col rounded-md py-2 px-2 gap-2">

                    <div className="flex items-center gap-2">
                        <span className="text-lg font-medium text-slate-900">{config.entry.name}</span>
                        <ExternalLink size={16}
                            className="transition duration-150 hover:cursor-pointer hover:bg-slate-50 hover:duration-150 text-blue-400" />
                    </div>
                    <div className="flex gap-2 items-center flex-wrap px-4 rounded-lg py-6 bg-white shadow-md transition duration-150 hover:bg-slate-50 hover:duration-150">
                        <span className="text-md font-medium text-center tracking-wide text-slate-500">I am</span>

                        <span className="text-md font-medium bg-teal-100 rounded-lg p-2 tracking-wide text-teal-500">{config.studyOrComplete}</span>

                        <span className="text-md font-medium text-center tracking-wide text-slate-500">a</span>

                        <span className="text-md font-medium bg-teal-100 rounded-lg p-2 tracking-wide text-teal-500">{config.assignmentType}</span>

                        <span className="text-md font-medium text-center tracking-wide text-slate-500">for</span>

                        <span className="text-md font-medium bg-teal-100 rounded-lg p-2 tracking-wide text-teal-500">{config.courseName}</span>

                    </div>

                </div>

                <div className="flex flex-col px-2 py-2">
                    <span className="text-sm font-medium">AI Assisted</span>
                    <Switch
                        checked={config.isAI}
                        onChange={(e) => {
                            setConfig({ ...config, isAI: !config.isAI });
                            //Reset hard blocks and soft nudges
                            setHardblocks([]);
                            setSoftnudges([]);
                            setHBlockInput("");
                            setSNudgeInput("");
                            setDuplicateInHB(null);
                            setDuplicateInSN(null);
                        }} />
                </div>

                {config.isAI ?
                    <div className="flex flex-col gap-2">

                        {/**Hardblocks */}
                        <BlockInputSection
                            label="Hard Block Sites"
                            description="Sites Better Campus AI agent will block."
                            placeholder="ex: https://www.youtube.com"
                            inputValue={hBlockInput}
                            onChangeInput={(e) => setHBlockInput(e.target.value)}
                            onSubmit={(e) => handleAddHardBlockSoftNudge(e, true)}
                            onDelete={(link) => {
                                const filtered = hardblocks.filter((h) => h !== link);
                                setHardblocks(filtered);
                            }}
                            duplicateMessage={
                                duplicateInSN ? `${duplicateInSN.normalized} is already in Soft Nudges.` : null
                            }
                            entries={hardblocks}
                        />

                        {/**Softnudges */}
                        <BlockInputSection
                            label="Soft Nudge Sites"
                            description="Sites Better Campus AI agent won't block but will nudge you back from."
                            placeholder="ex: https://www.youtube.com"
                            inputValue={sNudgeInput}
                            onChangeInput={(e) => setSNudgeInput(e.target.value)}
                            onSubmit={(e) => handleAddHardBlockSoftNudge(e, false)}
                            onDelete={(link) => {
                                const filtered = softnudges.filter((s) => s !== link);
                                setSoftnudges(filtered);
                            }}
                            duplicateMessage={
                                duplicateInHB ? `${duplicateInHB.normalized} is already in Hard Blocks.` : null
                            }
                            entries={softnudges}
                        />

                    </div> : null}
            </div>

        </div>
    );
}
export default SoloSession;