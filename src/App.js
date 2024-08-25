// import React, { useState, useEffect } from 'react';
// import { Button, TextField, CircularProgress, Container, Typography, Paper, Grid } from '@mui/material';

// const SHEET_ID = '1W25bBPekgh4yJyTaBGUMOv7Cy3LWl0d-zSy1jUjkzIE';  // Your Google Sheet ID
// const RANGE = 'Name!A:E';  // Adjusted the range to include column D

// function App() {
//   const [idNo, setIdNo] = useState('');
//   const [name, setName] = useState('');
//   const [oldBalance, setOldBalance] = useState('');
//   const [credit, setCredit] = useState('');
//   const [cash, setCash] = useState('');
//   const [bank, setBank] = useState('');
//   const [total, setTotal] = useState(0);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadGoogleScript = () => {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.onload = () => {
//         window.gapi.load('client', initClient);
//       };
//       script.onerror = () => {
//         console.error('Failed to load Google API script.');
//         setError('Failed to load Google API script.');
//       };
//       document.body.appendChild(script);
//     };

//     const initClient = async () => {
//       try {
//         await window.gapi.client.init({
//           apiKey: 'AIzaSyDdlWa9ZHEIFJ_rmZAlZkvEEdCP96x3FdQ',
//           discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//         });
//       } catch (error) {
//         console.error('Error initializing gapi:', error);
//         setError('Error initializing Google API.');
//       }
//     };

//     loadGoogleScript();
//   }, []);

//   const handleSearch = async () => {
//     setError('');
//     setName('');
//     setOldBalance('');
//     setLoading(true);

//     if (!idNo) {
//       setError('Please enter an ID_NO.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await window.gapi.client.sheets.spreadsheets.values.get({
//         spreadsheetId: SHEET_ID,
//         range: RANGE,
//       });

//       if (response.status !== 200) {
//         throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
//       }

//       const rows = response.result.values;

//       if (rows && rows.length > 0) {
//         const rowData = rows.find(row => row[0] === idNo);
//         if (rowData) {
//           setName(rowData[2]); // Automatically fill the name from column C
//           setOldBalance(rowData[4]); // Automatically fill the old balance from column D
//         } else {
//           setError('No matching ID found.');
//         }
//       } else {
//         setError('No data found.');
//       }
//     } catch (error) {
//       console.error('Error fetching the data:', error);
//       setError(`Error: ${error.message || 'Error fetching data.'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateTotal = () => {
//     const totalAmount =
//       parseFloat(oldBalance || 0) + parseFloat(credit || 0) - (parseFloat(bank || 0) + parseFloat(cash || 0));
//     setTotal(totalAmount);
//   };

//   useEffect(() => {
//     calculateTotal();
//   }, [oldBalance, credit, cash, bank]);

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography component="h1" variant="h5" style={{ marginBottom: '2rem', textAlign: 'center' }}>
//           MAHALAKSHMI STORES
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="DATE"
//               value={new Date().toLocaleDateString()}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="ID_NO"
//               value={idNo}
//               onChange={(e) => setIdNo(e.target.value)}
//               disabled={loading}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={handleSearch}
//               disabled={loading}
//             >
//               {loading ? <CircularProgress size={24} /> : 'Search'}
//             </Button>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="NAME"
//               value={name}
//               InputProps={{
//                 readOnly: true,
//               }}
//               disabled={loading || !name}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="OLD BALANCE"
//               value={oldBalance}
//               InputProps={{
//                 readOnly: true,  // Disable the field for editing
//               }}
//               disabled={loading || !oldBalance}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="CREDIT"
//               value={credit}
//               onChange={(e) => setCredit(e.target.value)}
//               disabled={loading}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="CASH"
//               value={cash}
//               onChange={(e) => setCash(e.target.value)}
//               disabled={loading}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="BANK"
//               value={bank}
//               onChange={(e) => setBank(e.target.value)}
//               disabled={loading}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="TOTAL"
//               value={total}
//               InputProps={{
//                 readOnly: true,
//               }}
//               disabled={loading}
//             />
//           </Grid>
//         </Grid>
//         {error && <Typography color="error" style={{ marginTop: '1rem' }}>{error}</Typography>}
//       </Paper>
//     </Container>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Button, TextField, CircularProgress, Container, Typography, Paper, Grid } from '@mui/material';
import { gapi } from 'gapi-script';

// Replace with your client ID and spreadsheet ID
const CLIENT_ID = '951840937495-47jfc42fiit1031u1a9kp70o2v4sftei.apps.googleusercontent.com';
// const SPREADSHEET_ID = '1W25bBPekgh4yJyTaBGUMOv7Cy3LWl0d-zSy1jUjkzIE';
const API_KEY = 'AIzaSyDdlWa9ZHEIFJ_rmZAlZkvEEdCP96x3FdQ'; // Replace with your API key

const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

const App = () => {
  const [idNo, setIdNo] = useState('');
  const [name, setName] = useState('');
  const [oldBalance, setOldBalance] = useState('');
  const [credit, setCredit] = useState('');
  const [cash, setCash] = useState('');
  const [bank, setBank] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [bill,setBill]=useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const handleClientLoad = () => {
      gapi.load('client:auth2', initializeGapiClient);
    };

    const initializeGapiClient = async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: SCOPES,
      });
      setIsAuthorized(gapi.auth2.getAuthInstance().isSignedIn.get());
    };

    handleClientLoad();
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      setIsAuthorized(true);
    });
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      setIsAuthorized(false);
    });
  };

  const handleSearch = async () => {
    setError('');
    setName('');
    setOldBalance('');
    setLoading(true);

    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1W25bBPekgh4yJyTaBGUMOv7Cy3LWl0d-zSy1jUjkzIE',
        range: 'Name!A:E',
      });

      const data = response.result.values || [];
      const row = data.find(row => row[0] === idNo);

      if (row) {
        setName(row[2] || '');
        setOldBalance(row[4] || '');
      } else {
        setError('No data found for the provided ID.');
      }
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const totalAmount =
      parseFloat(oldBalance || 0) + parseFloat(credit || 0) - (parseFloat(bank || 0) + parseFloat(cash || 0));
    setTotal(totalAmount);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      const data = [
        [bill,new Date().toLocaleDateString(),bill,idNo, name, oldBalance, credit, cash, bank, total]
      ];

      const request = {
        spreadsheetId: '1W25bBPekgh4yJyTaBGUMOv7Cy3LWl0d-zSy1jUjkzIE',
        range: 'sheet!B:J', // Adjust range as needed
        valueInputOption: 'RAW',
        resource: {
          values: data,
        },
      };

      const response = await gapi.client.sheets.spreadsheets.values.append(request);
      console.log('Submit response:', response.result);

      if (response.status === 200) {
        alert('Data submitted successfully!');
      } else {
        throw new Error('Error submitting data.');
      }
    } catch (error) {
      setError(`Error submitting data: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [oldBalance, credit, cash, bank]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          MAHALAKSHMI STORES
        </Typography>
        {!isAuthorized ? (
          <div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAuthClick}
            >
              Authorize
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleSignoutClick}
            >
              Sign Out
            </Button>
          </div>
        )}
        <Grid container spacing={2} style={{ marginTop: '2rem' }}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="DATE"
              value={new Date().toLocaleDateString()}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="ID_NO"
              value={idNo}
              onChange={(e) => setIdNo(e.target.value)}
              disabled={loading || !isAuthorized}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
              disabled={loading || !isAuthorized}
            >
              {loading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="NAME"
              value={name}
              InputProps={{ readOnly: true }}
              disabled={loading || !name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="OLD BALANCE"
              value={oldBalance}
              InputProps={{ readOnly: true }}
              disabled={loading || !oldBalance}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="CREDIT"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
              disabled={loading || !isAuthorized}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="CASH"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              disabled={loading || !isAuthorized}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="BANK"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              disabled={loading || !isAuthorized}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="TOTAL"
              value={total}
              InputProps={{ readOnly: true }}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleSubmit}
              disabled={submitting || !isAuthorized}
            >
              {submitting ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
        {error && <Typography color="error" style={{ marginTop: '1rem' }}>{error}</Typography>}
      </Paper>
    </Container>
  );
}

export default App;
