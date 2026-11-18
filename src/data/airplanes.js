import plane1 from '../assets/plane1.jpg';
import plane2 from '../assets/plane2.webp';
import plane3 from '../assets/plane3.jpg';
import hero from '../assets/hero.jpg';

const airplanes = [
  {
    id: 1,
    name: 'Boeing 737-800',
    type: 'narrow-body',
    passengers: 189,
    fuelVolume: 26020,
    description: 'The most widely used narrow-body airliner. Reliable short-to-medium haul aircraft.',
    image: plane1
  },
  {
    id: 2,
    name: 'Boeing 737 MAX',
    type: 'narrow-body',
    passengers: 210,
    fuelVolume: 25816,
    description: 'Next-generation efficiency and performance with advanced engines and aerodynamics.',
    image: plane2
  },
  {
    id: 3,
    name: 'Boeing 737',
    type: 'narrow-body',
    passengers: 180,
    fuelVolume: 26020,
    description: 'Iconic commercial jet with proven reliability across thousands of flights worldwide.',
    image: plane3
  },
  {
    id: 4,
    name: 'Airbus A320neo',
    type: 'narrow-body',
    passengers: 180,
    fuelVolume: 26730,
    description: 'Fuel-efficient next-generation single-aisle aircraft with advanced engines.',
    image: hero
  },
  {
    id: 5,
    name: 'Boeing 777-300ER',
    type: 'wide-body',
    passengers: 396,
    fuelVolume: 181280,
    description: 'Long-range wide-body twinjet. One of the most successful commercial aircraft ever.',
    image: plane1
  },
  {
    id: 6,
    name: 'Airbus A350-900',
    type: 'wide-body',
    passengers: 325,
    fuelVolume: 141160,
    description: 'Modern long-haul wide-body with composite fuselage and excellent fuel efficiency.',
    image: plane2
  }
];

export default airplanes;
