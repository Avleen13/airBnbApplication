const room =
{

    fakeDB : [],

    init()
    {

        this.fakeDB.push({title:'HOTEL ROOM | CISTERNINO, LA HABANA',description:`Cave with garden at Sacromonte
        `,price:`$90 CAD/night`});
    
        this.fakeDB.push({title:'VERIFIED | CISTERNINO, BRINDIS',description:`Exceptional property private beach`,price:`$70 CAD/night`});
    
        this. fakeDB.push({title:'ENTIRE VILLA | SAN FRANCISCO',description:`A beautiful villa in North Iceland`,price:`$90 CAD/night`});


        this. fakeDB.push({title:'PRIVATE ROOM | VEDADO, HABANA',description:`Best View From Modern Chalet`,price:`$80 CAD/night`});
    },
    getallRooms()
    {
        return this.fakeDB;
    }

}


room.init();
module.exports=room;