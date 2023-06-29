import React, { useEffect, useState } from 'react'
import FormSearch from '@/components/FormSearch'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import Map from '@/components/Map'

interface GeoCodeResponse {
    features: {
        geometry: {
            coordinates: [number, number]
        }
    }[]
}

function Search() {
    const router = useRouter();
    const location = router.query.location as string | undefined;
    const [marker, setMarker] = useState<[number, number] | undefined>();

    useEffect(() => {
        const geocodeAddress = async (location: string) => {
            try {
                const response = await fetch(
                    `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(location)}`
                );

                if (!response.ok) {
                    console.error('Network response was not ok');
                    return;
                }

                const data: GeoCodeResponse = await response.json();

                if (data.features.length > 0) {
                    const coordinates = data.features[0].geometry.coordinates;
                    setMarker(coordinates);


                }
            } catch (error) {
                console.error('Error geocoding address:', error);
            }
        };

        if (location) {
            geocodeAddress(location);
        }
    }, [marker]);

    return (
        <div>
            <Header />
            <main className='grid grid-cols-2 h-screen'>
                <section className='flex flex-col items-center pt-12'>
                    <div>
                        {location ? `Concernant votre bien situé au ${location}` : 'Veuillez entrer une adresse'}
                    </div>
                    <div className='mt-1'>
                        <div>
                            <FormSearch />
                        </div>
                    </div>
                </section>
                <section className='hidden xl:inline-flex xl:min-w-[600px]'>
                    {marker && <Map coord={marker} />}
                </section>
            </main>
        </div>
    )
}

export default Search;
