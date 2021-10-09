const router = require('express').Router();
const path = require( 'path' );

router.get('/', async (req, res) =>{
    console.log("inside of get/");
    res.sendFile( path.join( __dirname, '../public/index.html' ) );
});

router.get('/exercise', async (req, res) =>{
    console.log("inside of get/exercise");
    res.sendFile( path.join( __dirname, '../public/exercise.html' ) );
});

router.get('/stats', async (req, res) =>{
    console.log("inside of get/stats");
    res.sendFile( path.join( __dirname, '../public/stats.html' ) );
});

module.exports = router;