//Run this effect for whenever the user changes their universityQuery
  //Dynamic university filtering
  useEffect(()=>{

    //Only call api endpoint when query is greater than 2 characters
    if (universityQuery.length <2){
      setUniversityResults([]);
      return;
    }
    
    
    const controller = new AbortController();
    //setTimeout: calls our API call only if user hasn't typed again for 300ms. If user types within, just reruns effect.
    //Don't want it to be n, ny, nyu results in 3 network calls.

    //AbortController: Solves the problem of what if I already send a fetch and before it returns users types something else.
    //Don't want Fetch#2 to return first and then Fetch #1 returns later and overwrites what user thought was latest query
    //AbortCOntroller lets us cancel the old request when we start a new one, so old response is ignored
    //Prevents out of order responses.
    const timeoutId = setTimeout(async()=>{
      try{
        const response = await fetch("http://localhost:3000/canvasUniversities", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({q: universityQuery}),
        signal: controller.signal
        });

        const universities = await response.json();
        setUniversityResults(universities || []);
        console.log(universities);
      }catch(err){
        console.log(err);
        return;
      }
    }, 3000);


    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };

  }, [universityQuery]);