import plane1 from '../assets/plane1.jpg';
import plane2 from '../assets/plane2.webp';
import plane3 from '../assets/plane3.jpg';
import hero from '../assets/hero.jpg';

const map = {
  'plane1.jpg': plane1,
  'plane2.jpg': plane2,
  'plane2.webp': plane2,
  'plane3.jpg': plane3,
  'hero.jpg': hero,
  'assets/plane1.jpg': plane1,
  'assets/plane2.jpg': plane2,
  'assets/plane3.jpg': plane3,
  'assets/plane4.jpg': hero,
  'assets/plane5.jpg': plane1,
  'assets/plane6.jpg': plane2,
  'assets/plane7.jpg': plane3,
  'assets/plane8.jpg': hero
};

export function resolveImage(image) {
  if (!image) return hero;
  if (typeof image !== 'string') return image;
  return map[image] || hero;
}
