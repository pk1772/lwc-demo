import { LightningElement, wire } from 'lwc';
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import GEO_CO_ORDINATES from '@salesforce/messageChannel/SimpleMessageChannel__c';

export default class LmsPublisher extends LightningElement {
    address = '';
    result;

    @wire(MessageContext)
    messageContext;

    async getCoOrdinates() {
        const url =
            'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?address=' +
            this.address; //Eiffel%20Tower
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '33590697cfmsh0e08b3c6e212786p14d348jsn102c5cc75441',
                'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            this.result = await response.json();
            console.log(this.result);
        } catch (error) {
            console.error(error);
        }
    }

    handleOnclick() {
        let address = this.template.querySelector('lightning-input')?.value;
        this.address = encodeURIComponent(address.trim());
        this.getCoOrdinates().then(() => {
            this.publishMessage();
        });
    }

    publishMessage() {
        const address = this.result.Results[0];
        if (!(address === undefined || address === null)) {
            const payload = { Longitude: address.longitude, Latitude: address.latitude };
            console.log('##payload: ' + JSON.stringify(payload));
            publish(this.messageContext, GEO_CO_ORDINATES, payload);
        } else {
            console.log('{ address: null }');
        }
    }

    /*
    *
            {
                Results: [
                    {
                        Relevance: 1,
                        longitude: 2.2945,
                        latitude: 48.85824,
                        address:
                            'Eiffel Tower, 5 Avenue Anatole France, 75007, 7e Arrondissement, Paris, Ile-de-France, France',
                        addressnumber: '5',
                        street: 'Avenue Anatole France',
                        city: 'Paris',
                        region: 'Gros Caillou',
                        subregion: 'Paris',
                        country: 'France',
                        postalcode: '75007'
                    },
                    {
                        Relevance: 1,
                        longitude: 144.86304,
                        latitude: -37.71133,
                        address:
                            'Eiffel Tower, 12 Assembly Dr, Tullamarine, Melbourne, Victoria, 3043, Australia',
                        addressnumber: '12',
                        street: 'Assembly Dr',
                        city: 'Melbourne',
                        region: 'Tullamarine',
                        country: 'Australia',
                        postalcode: '3043'
                    },
                    {
                        Relevance: 1,
                        longitude: 144.86304,
                        latitude: -37.71133,
                        address:
                            'Eiffel Tower, 12 Assembly Dr, Tullamarine, Melbourne, Victoria, 3043, Australia',
                        addressnumber: '12',
                        street: 'Assembly Dr',
                        city: 'Melbourne',
                        region: 'Tullamarine',
                        country: 'Australia',
                        postalcode: '3043'
                    },
                    {
                        Relevance: 1,
                        longitude: 144.86304,
                        latitude: -37.71133,
                        address:
                            'Eiffel Tower, 12 Assembly Dr, Tullamarine, Melbourne, Victoria, 3043, Australia',
                        addressnumber: '12',
                        street: 'Assembly Dr',
                        city: 'Melbourne',
                        region: 'Tullamarine',
                        country: 'Australia',
                        postalcode: '3043'
                    },
                    {
                        Relevance: 1,
                        longitude: 2.29452,
                        latitude: 48.85832,
                        address: 'Eiffel Tower, Paris, Île-de-France, France',
                        city: 'Paris',
                        region: 'Paris 07',
                        subregion: 'Paris',
                        country: 'France'
                    },
                    {
                        Relevance: 1,
                        longitude: 73.01948,
                        latitude: 19.04264,
                        address:
                            'Eiffel Tower, Shrimad Chandra Shekhar Sarswati Marg, Nerul East, Navi Mumbai, Thane, Maharashtra, 400706, India',
                        street: 'Shrimad Chandra Shekhar Sarswati Marg',
                        city: 'Navi Mumbai',
                        subregion: 'Thane',
                        country: 'India',
                        postalcode: '400706'
                    },
                    {
                        Relevance: 1,
                        longitude: 72.83943,
                        latitude: 18.96882,
                        address:
                            'Eiffel Tower, Sardar Balvant Singh Dhodi Marg, Mazagaon, Mumbai, Maharashtra, 400010, India',
                        street: 'Sardar Balvant Singh Dhodi Marg',
                        city: 'Mumbai',
                        subregion: 'Mumbai',
                        country: 'India',
                        postalcode: '400010'
                    }
                ]
            };
    */
}
