const room =
{

    fakeDB : [],

    init()
    {

        this.fakeDB.push({image:`/images/img1.jpg`,title:'HOTEL ROOM | CISTERNINO, LA HABANA',description:`Cave with garden at Sacromonte
        `,price:`$90 CAD/night`});
    
        this.fakeDB.push({image:`/images/img2.jpg`,title:'VERIFIED | CISTERNINO, BRINDIS',description:`Exceptional property private beach`,price:`$70 CAD/night`});
    
        this. fakeDB.push({image:`/images/img3.jpg`,title:'ENTIRE VILLA | SAN FRANCISCO',description:`A beautiful villa in North Iceland`,price:`$90 CAD/night`});


        this. fakeDB.push({image:`/images/img4.jpg`,title:'PRIVATE ROOM | VEDADO, HABANA',description:`Best View From Modern Chalet`,price:`$80 CAD/night`});


        this.fakeDB.push({image:`/images/img5.jpg`,title:'TREE HOUSE | MONTE, VERDE',description:`Classical Apartment on the Royal Mile
        `,price:`$90 CAD/night`});
    
        this.fakeDB.push({image:`/images/img6.jpg`,title:'VERIFIED | ENTIRE APARTMENT, KOTOR',description:`Private House with Amazing Views!`,price:`$70 CAD/night`});
    
        this. fakeDB.push({image:`/images/img7.jpg`,title:'VERIFIED | SUZHOU, MENAGGIO',description:`Amazing and Extremely Central Flat`,price:`$60 CAD/night`});


        this. fakeDB.push({image:`/images/img8.jpg`,title:'ENTIRE HOUSE | CISTERNINO, BRINDIS',description:`Best View From Modern Chalet`,price:`$70 CAD/night`});
    },
    getallRooms()
    {
        return this.fakeDB;
    }

}


room.init();
module.exports=room;