const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');
const User = require('./models/User');
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [adminUser, userUser] = await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
    }, {
        username: 'user',
        password: 'user',
        token: nanoid(),
        role: 'user',
    });

    const [daftPunkArtist, fatboySlimArtist, gorillazArtist] = await Artist.create({
        title: 'Daft Punk',
        info: 'Daft Punk was a multi Grammy Award-winning electronic music duo formed in 1993 in Paris, France, and separated in early 2021, consisting of French musicians Thomas Bangalter (born 3 January 1975) and Guy-Manuel de  ...',
        image: 'fixtures/daft_punk.jpg',
        isPublished: false,
        user: adminUser._id
    }, {
        title: 'Fatboy Slim',
        info: 'Fatboy Slim is a pseudonym of Quentin Leo Cook (b. 31 Jul 1963 in Reigate, Surrey - aka Norman Cook), an English big beat musician. Quentin Leo Cook was educated at Reigate Grammar School. He started ...',
        image: 'fixtures/fatboy_slim.jpg',
        isPublished: true,
        user: userUser._id
    }, {
        title: 'Gorillaz',
        info: 'Gorillaz is a British virtual band created in 1998 by musician Damon Albarn and artist Jamie Hewlett. Canonically speaking, Murdoc Niccals formed the band. The band currently consists of four animated members ...',
        image: 'fixtures/gorillaz.jpg',
        isPublished: false,
        user: userUser._id
    });

    const [randomAccessMemoriesAlbum, discoveryAlbum, youveComeALongWayBabyAlbum, palookavilleAlbum, betterLivingThroughChemistryAlbum, demonDaysAlbum] = await Album.create({
        title: 'Random Access Memories',
        artist: daftPunkArtist._id,
        year: 2013,
        image: 'fixtures/random_access_memories.jpg',
        isPublished: true,
        user: adminUser._id
    }, {
        title: 'Discovery',
        artist: daftPunkArtist._id,
        year: 2001,
        image: 'fixtures/discovery.jpg',
        isPublished: true,
        user: adminUser._id
    }, {
        title: 'You\'ve Come a Long Way, Baby',
        artist: fatboySlimArtist._id,
        year: 1998,
        image: 'fixtures/youve_come_a_long_way_baby.jpg',
        isPublished: true,
        user: adminUser._id
    }, {
        title: 'Palookaville',
        artist: fatboySlimArtist._id,
        year: 2004,
        image: 'fixtures/palookaville.jpg',
        isPublished: false,
        user: adminUser._id
    }, {
        title: 'Better Living Through Chemistry',
        artist: fatboySlimArtist._id,
        year: 1996,
        image: 'fixtures/better_living_through_chemistry.jpg',
        isPublished: true,
        user: adminUser._id
    }, {
        title: 'Demon Days',
        artist: gorillazArtist._id,
        year: 2005,
        image: 'fixtures/demon_days.jpg',
        isPublished: true,
        user: adminUser._id
    });

    await Track.create({
        number: 1,
        title: 'Give Life Back to Music',
        album: randomAccessMemoriesAlbum._id,
        length: '4:35',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 2,
        title: 'The Game of Love',
        album: randomAccessMemoriesAlbum._id,
        length: '5:22',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 3,
        title: 'Giorgio by Moroder',
        album: randomAccessMemoriesAlbum._id,
        length: '9:04',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 4,
        title: 'Within',
        album: randomAccessMemoriesAlbum._id,
        length: '3:48',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 5,
        title: 'Instant Crush (feat. Julian Casablancas)',
        album: randomAccessMemoriesAlbum._id,
        length: '5:37',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 6,
        title: 'Lose Yourself to Dance (feat. Pharrell Williams)',
        album: randomAccessMemoriesAlbum._id,
        length: '5:53',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 7,
        title: 'Touch (feat. Paul Williams)',
        album: randomAccessMemoriesAlbum._id,
        length: '8:18',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 8,
        title: 'Get Lucky (feat. Pharrell Williams)',
        album: randomAccessMemoriesAlbum._id,
        length: '6:09',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 9,
        title: 'Beyond',
        album: randomAccessMemoriesAlbum._id,
        length: '4:50',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 10,
        title: 'Motherboard',
        album: randomAccessMemoriesAlbum._id,
        length: '5:41',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 11,
        title: 'Fragments of Time (feat. Todd Edwards)',
        album: randomAccessMemoriesAlbum._id,
        length: '4:39',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 12,
        title: 'Doin\' It Right (feat. Panda Bear)',
        album: randomAccessMemoriesAlbum._id,
        length: '4:11',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 13,
        title: 'Contact',
        album: randomAccessMemoriesAlbum._id,
        length: '4:11',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 1,
        title: 'One More Time',
        album: discoveryAlbum._id,
        length: '5:20',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 2,
        title: 'Aerodynamic',
        album: discoveryAlbum._id,
        length: '3:33',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 3,
        title: 'Digital Love',
        album: discoveryAlbum._id,
        length: '5:01',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 4,
        title: 'Harder, Better, Faster, Stronger',
        album: discoveryAlbum._id,
        length: '3:45',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 5,
        title: 'Crescendolls',
        album: discoveryAlbum._id,
        length: '3:28',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 6,
        title: 'Nightvision',
        album: discoveryAlbum._id,
        length: '1:43',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 7,
        title: 'Superheroes',
        album: discoveryAlbum._id,
        length: '3:57',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 8,
        title: 'High Life',
        album: discoveryAlbum._id,
        length: '3:13',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 9,
        title: 'Something About Us',
        album: discoveryAlbum._id,
        length: '3:53',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 10,
        title: 'Voyager',
        album: discoveryAlbum._id,
        length: '3:47',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 11,
        title: 'Veridis Quo',
        album: discoveryAlbum._id,
        length: '5:44',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 12,
        title: 'Short Circuit',
        album: discoveryAlbum._id,
        length: '3:26',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 13,
        title: 'Face to Face',
        album: discoveryAlbum._id,
        length: '3:58',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 14,
        title: 'Too Long',
        album: discoveryAlbum._id,
        length: '10:00',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 1,
        title: 'Right Here, Right Now',
        album: youveComeALongWayBabyAlbum._id,
        length: '5:55',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 2,
        title: 'The Rockafeller Skank',
        album: youveComeALongWayBabyAlbum._id,
        length: '3:54',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 3,
        title: 'In Heaven',
        album: youveComeALongWayBabyAlbum._id,
        length: '3:55',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 4,
        title: 'Gangster Tripping',
        album: youveComeALongWayBabyAlbum._id,
        length: '5:20',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 5,
        title: 'Build It Up - Tear It Down',
        album: youveComeALongWayBabyAlbum._id,
        length: '5:06',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 6,
        title: 'Kalifornia',
        album: youveComeALongWayBabyAlbum._id,
        length: '5:54',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 7,
        title: 'Soul Surfing',
        album: youveComeALongWayBabyAlbum._id,
        length: '9:18',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 8,
        title: 'You\'re Not from Brighton',
        album: youveComeALongWayBabyAlbum._id,
        length: '5:21',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 9,
        title: 'Praise You - Remastere',
        album: youveComeALongWayBabyAlbum._id,
        length: '5:23',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 10,
        title: 'Love Island',
        album: youveComeALongWayBabyAlbum._id,
        length: '5:18',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 11,
        title: 'Acid 8000',
        album: youveComeALongWayBabyAlbum._id,
        length: '7:28',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 1,
        title: 'Don\'t Let the Man Get You Down',
        album: palookavilleAlbum._id,
        length: '4:04',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 2,
        title: 'Slash Dot Dash',
        album: palookavilleAlbum._id,
        length: '2:55',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 3,
        title: 'Wonderful Night',
        album: palookavilleAlbum._id,
        length: '4:47',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 4,
        title: 'Long Way from Home',
        album: palookavilleAlbum._id,
        length: '4:45',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 5,
        title: 'Put It Back Together',
        album: palookavilleAlbum._id,
        length: '4:37',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 6,
        title: 'El Bebe Masoquista',
        album: palookavilleAlbum._id,
        length: '4:26',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 7,
        title: 'Push and Shove',
        album: palookavilleAlbum._id,
        length: '4:28',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 8,
        title: 'North West Three',
        album: palookavilleAlbum._id,
        length: '4:31',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 9,
        title: 'The Journey',
        album: palookavilleAlbum._id,
        length: '4:37',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 10,
        title: 'Jin Go Lo Ba',
        album: palookavilleAlbum._id,
        length: '4:41',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 11,
        title: 'Song for Chesh',
        album: palookavilleAlbum._id,
        length: '4:19',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 12,
        title: 'The Joker',
        album: palookavilleAlbum._id,
        length: '5:40',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 1,
        title: 'Song for Lindy',
        album: betterLivingThroughChemistryAlbum._id,
        length: '4:50',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 2,
        title: 'Santa Cruz',
        album: betterLivingThroughChemistryAlbum._id,
        length: '7:30',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 3,
        title: 'Going Out of My Head',
        album: betterLivingThroughChemistryAlbum._id,
        length: '5:14',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 4,
        title: 'The Weekend Starts Here',
        album: betterLivingThroughChemistryAlbum._id,
        length: '6:41',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 5,
        title: 'Everybody Needs a 303',
        album: betterLivingThroughChemistryAlbum._id,
        length: '5:49',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 6,
        title: 'Give the Po\' Man a Break',
        album: betterLivingThroughChemistryAlbum._id,
        length: '5:52',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 7,
        title: '10th & Crenshaw',
        album: betterLivingThroughChemistryAlbum._id,
        length: '4:19',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 8,
        title: 'First Down',
        album: betterLivingThroughChemistryAlbum._id,
        length: '6:18',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 9,
        title: 'Punk to Funk',
        album: betterLivingThroughChemistryAlbum._id,
        length: '4:57',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 10,
        title: 'The Sound of Milwaukee',
        album: betterLivingThroughChemistryAlbum._id,
        length: '6:18',
        isPublished: false,
        user: adminUser._id
    }, {
        number: 11,
        title: 'Michael Jackson',
        album: betterLivingThroughChemistryAlbum._id,
        length: '5:44',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 12,
        title: 'Next to Nothing',
        album: betterLivingThroughChemistryAlbum._id,
        length: '7:16',
        isPublished: true,
        user: adminUser._id
    }, {
        number: 1,
        title: 'Intro',
        album: demonDaysAlbum._id,
        length: '1:03',
        isPublished: false,
        user: userUser._id
    }, {
        number: 2,
        title: 'Last Living Souls',
        album: demonDaysAlbum._id,
        length: '3:25',
        isPublished: true,
        user: userUser._id
    }, {
        number: 3,
        title: 'Kids With Guns',
        album: demonDaysAlbum._id,
        length: '3:46',
        isPublished: true,
        user: userUser._id
    }, {
        number: 4,
        title: 'O Green World',
        album: demonDaysAlbum._id,
        length: '4:31',
        isPublished: false,
        user: userUser._id
    }, {
        number: 5,
        title: 'Dirty Harry',
        album: demonDaysAlbum._id,
        length: '3:44',
        isPublished: true,
        user: userUser._id
    }, {
        number: 6,
        title: 'Feel Good Inc.',
        album: demonDaysAlbum._id,
        length: '3:41',
        isPublished: true,
        user: userUser._id
    }, {
        number: 7,
        title: 'El Mañana',
        album: demonDaysAlbum._id,
        length: '5:37',
        isPublished: false,
        user: userUser._id
    }, {
        number: 8,
        title: 'Every Planet We Reach Is Dead',
        album: demonDaysAlbum._id,
        length: '4:53',
        isPublished: true,
        user: userUser._id
    }, {
        number: 9,
        title: 'November Has Come',
        album: demonDaysAlbum._id,
        length: '2:45',
        isPublished: true,
        user: userUser._id
    }, {
        number: 10,
        title: 'All Alone',
        album: demonDaysAlbum._id,
        length: '3:30',
        isPublished: true,
        user: userUser._id
    }, {
        number: 11,
        title: 'White Light',
        album: demonDaysAlbum._id,
        length: '2:08',
        isPublished: true,
        user: userUser._id
    }, {
        number: 12,
        title: 'DARE',
        album: demonDaysAlbum._id,
        length: '4:06',
        isPublished: true,
        user: userUser._id
    }, {
        number: 13,
        title: 'Fire Coming Out of the Monkey\'s Head',
        album: demonDaysAlbum._id,
        length: '3:16',
        isPublished: true,
        user: userUser._id
    }, {
        number: 14,
        title: 'Don\'t Get Lost in Heaven',
        album: demonDaysAlbum._id,
        length: '1:58',
        isPublished: true,
        user: userUser._id
    }, {
        number: 15,
        title: 'Demon Days',
        album: demonDaysAlbum._id,
        length: '4:48',
        isPublished: true,
        user: userUser._id
    });

    await mongoose.connection.close();
};

run().catch(console.error);