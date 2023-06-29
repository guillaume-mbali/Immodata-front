import React, { Component, useEffect, useState } from 'react'
import FormSearch from '@/components/FormSearch'
import Header from '@/components/Header'
import { useRouter } from 'next/dist/client/router'
import Map from '@/components/Map'
import ReactMapGL, { ViewportProps } from "react-map-gl";


function Search() {


    const router = useRouter();
    const { location } = router.query;
    const [marker, setMarker] = useState<[number, number]>();

    useEffect(() => {
        const geocodeAddress = async () => {
            try {
                if (location) {
                    const response = await fetch(
                        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(location)}`
                    );
                    const data = await response.json();

                    if (data.features.length > 0) {
                        const coordinates = data.features[0].geometry.coordinates;
                        setMarker(coordinates);
                        console.log(marker);

                    }


                }
            } catch (error) {
                console.error('Error geocoding address:', error);
            }
        };

        geocodeAddress();
    }, []);
    

    return (
        <div>
            <Header />
            <main className='grid grid-cols-2 h-screen'>
                <section className='flex flex-col items-center pt-12'>
                    <div>
                        Concernant votre bien situé au {location}
                    </div>
                    <div className='mt-1'>
                        <div>
                            <FormSearch />
                        </div>
                    </div>
                </section>
                <section className='hidden xl:inline-flex xl:min-w-[600px]'>
                    <Map coord={marker} />
                </section>

            </main>
        </div>
    )
}

export default Search;

// export async function getServerSideProps() {
//     const searchResults = await fetch("https://api-adresse.data.gouv.fr/search/?q=213 avenue rubillard 72000")
//         .then(
//             (res) => res.json()
//         );
//     return {
//         props: {
//             searchResults,
//         }
//     }

// }
