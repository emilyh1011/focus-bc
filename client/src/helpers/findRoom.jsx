export default function findRoom(roomId, rooms){
    for (const room of rooms){
        if (roomId === room.roomId){
            return room;
        }
    }
    return null;
}