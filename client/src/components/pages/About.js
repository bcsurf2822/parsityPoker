
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/system';

const AboutChildren = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  border: '1px solid',
}));

const Table = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  border: '1px solid',
  height: '400px',
  width: '800px',
}));


const About = () => {
  return (
    <div>
          <Box sx={{
      display: 'flex',        // Enables Flexbox
      justifyContent: 'center', // Horizontally centers the content
      alignItems: 'center',     // Vertically centers the content
      height: '97vh',          // Sets the height of the box to full viewport height
      border: '1px solid',
    }}>
 <Stack
  direction="row"
  justifyContent="center"
  alignItems="center"
  spacing={4}
>
        <AboutChildren>Item 1</AboutChildren>
        <Table>Table</Table>
        <AboutChildren>Item 2</AboutChildren>

      </Stack>
    </Box>
    
    </div>
  );
};

export default About;