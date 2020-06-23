import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
    {
        id: "p1",
        title: 'Empire State Building',
        description: 'One of most famous building in USA',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR5W-FVA1C7EKr5kWtmjsv6WHjtXyw-uhZaXSSkbZ7cldNVNGC5&usqp=CAU' ,
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: "p2",
        title: 'Empire State Building',
        description: 'One of most famous building in USA',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTqVOIizBACvXaMPGk_2LiEzIOFT5ZKDocjigABxhjANz_E0zBw&usqp=CAU' ,
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
]

const UserPlaces = () => {
    const userId = useParams().userId;
    const LoadedPlace = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={LoadedPlace} />
};

export default UserPlaces;