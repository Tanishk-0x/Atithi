
const QueryBuilder = ( data ) => {

    let Query = {} ; 

    // setting the unNull data 

    if(data.city){
        Query.city = { $regex : data.city , $options: "i" };
    }

    if(data.maxPrice){
        Query.rent = { $lte: data.maxPrice };
    }

    if(data.guest){
        Query.maxGuestAllowed = { $gte : data.guest };
    }

    if(data.category){
        Query.category = data.category ;
    }

    if(data.amenities?.length > 0){
        Query.amenities = { $all : data.amenities };
    }

    return Query ; 
    
}; 

module.exports = QueryBuilder ; 