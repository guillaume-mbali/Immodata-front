import React, { Component } from 'react'
import CardProperty from './CardProperty'
import { HomeIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { Steps, Button, InputNumber } from 'antd';
import axios from 'axios';



const { Step } = Steps;

// Définir les interfaces pour les données de chaque formulaire
interface PersonalDetailsFormData {
    firstName: string;
    lastName: string;
}
interface PropertyFormData {
    house: boolean;
    building: boolean;
}

interface PropertyDetailsFormData {
    nbPiece: number;
    area: number
}

interface AddressDetailsFormData {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
}

function FormSearch() {
    // État local pour stocker les données de chaque formulaire
    const [propertyFormData, setpropertyFormData] = useState<PropertyFormData>({
        house: false,
        building: false,
    });
    const [personalDetailsFormData, setPersonalDetailsFormData] = useState<PersonalDetailsFormData>({
        firstName: '',
        lastName: '',
    });
    const [propertyDetailsFormData, setPropertyDetailsFormData] = useState<PropertyDetailsFormData>({
        nbPiece: 1,
        area: 0
    });
    const [addressDetailsFormData, setAddressDetailsFormData] = useState<AddressDetailsFormData>({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
    });
    console.log(propertyFormData.house)

    const [isActive, setIsActive] = useState({
        isActive: false,
    });
    console.log(propertyFormData.house)

    // État local pour suivre la progression du stepper
    const [currentStep, setCurrentStep] = useState(0);

    // Fonction pour passer au formulaire suivant
    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    // Fonction pour revenir au formulaire précédent
    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    // Fonction pour soumettre le formulaire final
    const handleSubmit = () => {
        console.log('Données soumises :', { ...propertyFormData, ...personalDetailsFormData, ...propertyDetailsFormData, ...addressDetailsFormData });
    };

    const houseValueChange = () => {
        setpropertyFormData(prevState => ({
            ...prevState,
            building: false,
            house: !prevState.house
        }));
    };
    const buildingValueChange = () => {
        setpropertyFormData(prevState => ({
            ...prevState,
            house: false,
            building: !prevState.building
        }));
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <Steps current={currentStep} progressDot>
                <Step title="De quel type de bien s'agit-il ?" />
                <Step title="Informations principales du bien" />
                <Step title="Confirmation" />
            </Steps>

            {/* Formulaire 1 : Détails personnels */}
            {currentStep === 0 && (
                <div className="mt-10">
                    <div className='flex gap-5'>
                        <CardProperty
                            icon={props => <HomeIcon {...props} />}
                            title='Maison'
                            isActivate={propertyFormData.house}
                            onChildClick={houseValueChange}
                        />
                        <CardProperty
                            icon={props => <HomeIcon {...props} />}
                            title='Immeuble'
                            isActivate={propertyFormData.building}
                            onChildClick={buildingValueChange}
                        />
                    </div>
                </div>
            )}

            {/* Formulaire 2 : Coordonnées */}
            {currentStep === 1 && (
                <div className="mt-10">
                    <div className='flex flex-col gap-5'>
                        <div className='flex justify-between'>
                            <p>Surface :</p>
                            <InputNumber
                                min={1} max={10}
                                value={propertyDetailsFormData.area}
                                onChange={(e) => setPropertyDetailsFormData({ ...propertyDetailsFormData, area: e.target.value })
                                }
                            />
                        </div>
                        <div className='flex justify-between'>
                            <p>Nombre de pièces :</p>
                            <InputNumber
                                min={1} max={10}
                                value={propertyDetailsFormData.nbPiece}
                                onChange={(e) => setPropertyDetailsFormData({ ...propertyDetailsFormData, nbPiece: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Formulaire 3 : Confirmation */}
            {currentStep === 2 && (
                <div className="mt-10">
                    <div className="mb-5 text-green-500 flex items-center">
                        {/* <CheckCircleOutlined className="mr-2" /> */}
                        Vos informations ont été soumises avec succès !
                    </div>
                </div>
            )}
            <div className='fixed bottom-14 flex justify-between'>
                <div >
                    {currentStep != 0 && (
                        <Button onClick={handlePrevious}>Précédent</Button>
                    )}
                </div>
                <Button onClick={handleNext}>Suivant</Button>
            </div>
        </div>
    )
}
export default FormSearch
