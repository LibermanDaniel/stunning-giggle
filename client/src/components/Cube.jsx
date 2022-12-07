import React from 'react';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export default function Cube() {
  // const colorMap = useLoader(TextureLoader, <p>1</p>)

  return (
    <mesh rotation={[90, 0, 20]}>
      <boxBufferGeometry attach='geometry' args={[3, 3, 3]} />
      <meshLambertMaterial attach='material' color='#7C9473' />
    </mesh>
  );
}
