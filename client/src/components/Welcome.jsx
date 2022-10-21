import { Container } from '@mui/system';
import AnimatedText from 'react-animated-text-content';


const textInputStyle = {
    height: 50,
    paddingHorizontal: 20,
    fontSize: 80, 
    color: 'white',
    borderWidth: 1, 
    borderColor: '#3b8c00',
    borderRadius: 25
  };

export default function StickyFooter() {
    return (
        <Container>
<AnimatedText
  style={textInputStyle}
  type="words" // animate words or chars
  animation={{
    x: '200px',
    y: '-20px',
    scale: 1.1,
    ease: 'ease-in-out',
  }}

  animationType="float"
  interval={0.06}
  duration={0.8}
  tag="p"
  className="animated-paragraph"
  includeWhiteSpaces
  threshold={0.1}
  rootMargin="20%"
>
  WELCOME TO GYROCUBE 
</AnimatedText>
</Container>
    );
}