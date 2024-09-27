document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("playpause");
    const PreviousButton = document.getElementById("Previous");
    const NextButton = document.getElementById("Next");
    const songInfo = document.querySelector(".songInfo");
    const songTime = document.querySelector(".songTime");
    const seekbar = document.querySelector(".seekbar");
    // const circle = document.querySelector(".circle");
    const audioPlayer = document.querySelector(".audio-player");

    const songData = JSON.parse(localStorage.getItem("selectedSong"));

    if (songData) {
        songInfo.textContent = `${songData.title} - ${songData.artist}`;
        audioPlayer.src = songData.audio;
    }

    let currentSongIndex = 0;
    let isPlaying = false;


    function formatTime(timeInSeconds) {
        const totalSeconds = Math.floor(timeInSeconds);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    
    
    function updateSongInfo() {
        const currentSong = songs[currentSongIndex];
        if (songInfo) songInfo.textContent = `${currentSong.title} - ${currentSong.artist}`;
        if (songTime) songTime.textContent = currentSong.duration;
        if (audioPlayer) audioPlayer.src = currentSong.audio;
        if (lyricsContainer) lyricsContainer.textContent = currentSong.lyrics;
        if (!audioPlayer.paused) {
            audioPlayer.play();
        }
    }
    
    if(playButton){
    playButton.addEventListener("click", function() {
        if (!isPlaying) {
            isPlaying = true;   
            audioPlayer.play();
            playButton.src= "Assets/pause.svg"
        } else {
            isPlaying = false;
            audioPlayer.pause();
            playButton.src = "Assets/play.svg"
        }
    });
}
    
    if (PreviousButton) {
        PreviousButton.addEventListener("click", function() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            updateSongInfo(songs);
            if (isPlaying) audioPlayer.play();
        });
    }

    if (NextButton) {
        NextButton.addEventListener("click", function() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            updateSongInfo(songs);
            if (isPlaying) audioPlayer.play();
        });
    }

    document.addEventListener("keydown", function(e) {
        if(e.key === " " && audioPlayer.paused)
            {
            isPlaying = true;   
            audioPlayer.play();
            playButton.src= "Assets/pause.svg"
             }
        else if(e.key === " " && !audioPlayer.paused)
            {
            isPlaying = false;
            audioPlayer.pause();
            playButton.src = "Assets/play.svg"
            }
        });

    if (audioPlayer) {
        audioPlayer.addEventListener("timeupdate", function() {
            const currentTime = formatTime(audioPlayer.currentTime);
            const duration = formatTime(audioPlayer.duration);
            if (songTime) songTime.textContent = `${currentTime} / ${duration}`;
            if (seekbar) seekbar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        });

        audioPlayer.addEventListener("ended", function() {
            isPlaying = false;
            playButton.src = "Assets/play.svg";
        });

        audioPlayer.addEventListener("loadedmetadata", function() {
            const totalTime = formatTime(audioPlayer.duration);
            if (songTime) songTime.textContent = totalTime;
            if (seekbar) seekbar.max = audioPlayer.duration;
        });
    }

    if (seekbar) {
        seekbar.addEventListener("input", function() {
            if (audioPlayer) {
                audioPlayer.currentTime = (seekbar.value / 100) * audioPlayer.duration;
            }
        });
    }

    updateSongInfo(songs);

    audioPlayer.addEventListener("ended", function() {
        isPlaying = false;
        playButton.classList.remove("playing");
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const songs = [
        {
            title: "Many Men",
            artist: "Pop Smoke",
            image: "cover/pop smoke.png",
            lyrics: `Have mercy on me, have mercy on my soul
            Don't let my heart turn cold
            Have mercy on me, have mercy on my soul
            Don't let my heart turn cold
            Have mercy on many men
            Many, many, many, many men
            
            Wish death 'pon me
            Yeah, I don't cry no mo'
            I don't look to the sky no mo'
            'Cause I got it on me
            I got it on me (talk that shit)
            I got it on me
            You can run up if you want
            Fuck is you talking 'bout?
            
            Look
            It's pop smoke, niggas know me
            Keep two fours like I'm kobe
            Is you ridin' or you hidin'?
            If you slidin' then you owe me
            Run up, catch cold feet
            Niggas act tough, then call police
            I don't make friends, yeah, I make bands
            
            Got some ray bans with some og
            This ar be my trophy
            Shoot first, nigga shoot back
            09, niggas woo back
            Nigga automatic when the woo clap
            Shoot first, nigga shoot back
            09, niggas woo back
            Nigga automatic when the woo clap (automatic when the woo clap)
            
            Have mercy on me, have mercy on my soul
            Don't let my heart turn cold
            Have mercy on me, have mercy on my soul
            Don't let my heart turn cold
            Have mercy on many men
            Many, many, many, many men
            
            Wish death 'pon me
            Yeah, I don't cry no mo'
            I don't look to the sky no mo'
            'Cause I got it on me
            I got it on me
            I got it on me
            You can run up if you want
            
            Fifty stacks up in this deck, I won't let 'em
            Hd niggas, two berettas
            Shoot first and do yourself a favor
            Report like I'm craig sager
            Back out, niggas ain't with the bluffin'
            Drac' boom, nigga shoot you for nothin'
            
            Ten toes on your block like I'm drummin'
            Ask k, I have a blicky rollin' (it's pop smoke)
            It's that nigga from the floss, yeah, bitch right back
            And I don't politic 'cause niggas ain't like that
            I drop a slip or two and get a light pack
            And I don't care if you losin', still fight back
            
            Have mercy on me, have mercy on my soul
            Don't let my heart turn cold
            Have mercy on me, have mercy on my soul
            Don't let my heart turn cold
            Have mercy on many men
            Many, many, many, many men
            

            Wish death 'pon me
            Yeah, I don't cry no mo'
            I don't look to the sky no mo'
            'Cause I got it on me
            I got it on me
            I got it on me
            You can run up if you want
            Mercy on me`,
            audio: "song/pop smoke.mp3"

        },
        
        {
            title: "Oh Girl",
            artist: "The Chi-Lites",
            image: "cover/chi lites.png",
            lyrics: `Oh, girl
            I'd be in trouble if you left me now
            'Cause I don't know where to look for love
            I just don't know how
            Oh, girl
            How I depend on you
            To give me love when I need it
            Right on time you would always be
            All my friends call me a fool
            They say, "Let the woman take care of you"
            So I, I try to be hip and think like the crowd
            But even the crowd can't help me now, ohh
            Oh, girl
            Tell me what am I gonna do
            I know I've got a guilty face
            Girl, I feel so out of place, oh, yeah, yeah, yeah
            Don't know where to go and who to see, yeah
            Ohh
            Oh, girl
            I guess I better go
            I can save myself a lot of useless tears
            Girl, I've gotta get away from here
            Oh, girl
            Pain will double if you leave me now
            'Cause I don't know where to look for love
            And I don't, I don't know how
            Oh, oh
            Oh, girl
            Why do I love you so? Yeah
            Better be on my way, I can't stay, yeah
            Oh, yeah
            Uh-huh
            Have you ever seen such a helpless man? Oh no
            Oh
            `,
            audio: "song/oh Girl.mp3"

        },

        {
            title: "Say You Say Me",
            artist: "Lionel Richie",
            image: "cover/rsz_dancing.png",
            lyrics: `Say you, say me
            Say it for always
            That's the way it should be
            Say you, say me
            Say it together, naturally
            I had a dream, I had an awesome dream
            People in the park playing games in the dark
            And what they played was a masquerade
            And from behind the walls of doubt
            A voice was crying out
            Say you, say me
            Say it for always
            That's the way it should be
            Say you, say me
            Say it together, naturally
            As we go down life's lonesome highway
            Seems the hardest thing to do is to find a friend or two
            That helping hand
            Someone who understands
            That when you feel you've lost your way
            You've got someone there to say, "I'll show you"
            Say you, say me
            Say it for always (oh)
            That's the way it should be
            Say you, say me
            Say it together, naturally
            So you think you know the answers? Oh no
            Well the whole world's got you dancing
            That's right, I'm telling you
            Time to start believing, oh yes
            Believe in who you are
            You are a shining star
            Say you, say me
            Say it for always
            Oh, that's the way it should be
            Say you, say me
            Say it together, naturally
            Say it together, naturally`,
            audio: "song/Say You, Say Me.mp3"

        },

        {
            title: "Country Road",
            artist: "John Denver",
            image: "cover/Country Road.png",
            lyrics: `Almost heaven, West Virginia
            Blue Ridge Mountains, Shenandoah River
            Life is old there, older than the trees
            Younger than the mountains, growin' like a breeze
            Country roads, take me home
            To the place I belong
            West Virginia, mountain mama
            Take me home, country roads
            All my memories gather 'round her
            Miner's lady, stranger to blue water
            Dark and dusty, painted on the sky
            Misty taste of moonshine, teardrop in my eye
            Country roads, take me home
            To the place I belong
            West Virginia, mountain mama
            Take me home, country roads
            I hear her voice in the mornin' hour, she calls me
            The radio reminds me of my home far away
            Drivin' down the road, I get a feelin'
            That I should've been home yesterday, yesterday
            Country roads, take me home
            To the place I belong
            West Virginia, mountain mama
            Take me home, country roads
            Country roads, take me home
            To the place I belong
            West Virginia, mountain mama
            Take me home, country roads
            Take me home, (down) country roads
            Take me home, (down) country roads`,
            audio: "song/Country Road.mp3"
        },
        {
            title: "Heartless",
            artist: "Kanye West",
            image: "cover/Kanye.png",
            lyrics: `In the night I hear 'em talk
            The coldest story ever told
            Somewhere far along this road
            He lost his soul to a woman so heartless
            How could you be so heartless?
            Oh, how could you be so heartless?
            How could you be so, cold as the winter wind when it breeze, yo
            Just remember that you talkin' to me though
            You need to watch the way you talkin' to me, yo
            I mean after all the things that we've been through
            I mean after all the things we got into
            Ayo, I know of some things that you ain't told me
            Ayo, I did some things, but that's the old me
            And now you wanna get me back and you gon' show me
            So you walk around like you don't know me
            You got a new friend, well, I got homies
            But in the end it's still so lonely
            In the night I hear 'em talk
            The coldest story ever told
            Somewhere far along this road
            He lost his soul to a woman so heartless
            How could you be so heartless?
            Oh, how could you be so heartless?
            How could be so Dr. Evil?
            You bringin' out a side of me that I don't know
            I decided we weren't gon' speak so
            Why we up 3:00 a.m. on the phone?
            Why do she be so mad at me for?
            Homie, I don't know, she's hot and cold
            I won't stop, won't mess my groove up
            'Cause I already know how this thing go
            You run and tell your friends that you're leaving me (hey)
            They say that they don't see what you see in me (hey)
            You wait a couple months then you gon' see (hey)
            You'll never find nobody better than me
            In the night I hear 'em talk
            The coldest story ever told
            Somewhere far along this road
            He lost his soul to a woman so heartless
            How could you be so heartless?
            Oh, how could you be so heartless?
            Talk and talk and talk and talk
            Baby let's just knock it off
            They don't know what we been through
            They don't know 'bout me and you
            So I got something new to see
            And you just gon' keep hatin' me
            And we just gon' be enemies
            I know you can't believe
            I could just leave it wrong
            And you can't make it right
            I'm gon' take off tonight
            Into the night
            In the night I hear 'em talk
            The coldest story ever told
            Somewhere far along this road
            He lost his soul to a woman so heartless
            How could you be so heartless?
            Oh, how could you be so heartless?
            `,
            audio: "song/Heartless.mp3"
        },
        {
            title: "Stuck On You",
            artist: "Lionel Richie",
            image: "cover/Lionel Richie.png",
            lyrics: `Stuck on you
            I've got this feeling down deep in my soul that I just can't lose
            Guess I'm on my way
            Needed a friend
            And the way I feel now I guess I'll be with you 'til the end
            Guess I'm on my way
            Mighty glad you stayed
            I'm stuck on you
            Been a fool too long I guess it's time for me to come on home
            Guess I'm on my way
            So hard to see
            That a woman like you could wait around for a man like me
            Guess I'm on my way
            Mighty glad you stayed
            Oh, I'm leaving on that midnight train tomorrow
            And I know just where I'm going
            I've packed up my troubles and I've thrown them all away
            'Cause this time little darling
            I'm coming home to stay
            I'm stuck on you
            I've got this feeling down deep in my soul that I just can't lose
            Guess I'm on my way
            Needed a friend
            And the way I feel now I guess I'll be with you 'til the end
            Guess I'm on my way
            I'm mighty glad you stayed
            I'm mighty glad you stayed
            `,
            audio: "song/Stuck On You.mp3"

        },

        {
            title: "All By Myself",
            artist: "Celine Dion",
            image: "cover/Celine Dion.png",
            lyrics: `When I was young
            I never needed anyone
            And making love was just for fun
            Those days are gone
            Livin' alone
            I think of all the friends I've known
            When I dial the telephone
            Nobody's home
            All by myself
            Don't wanna be
            All by myself anymore
            Hard to be sure
            Sometimes I feel so insecure
            And love's so distant and obscure
            Remains the cure
            All by myself
            Don't wanna be all by myself anymore
            All by myself, I don't wanna live
            Don't wanna be all by myself anymore
            When I was young
            I never needed anyone
            And making love was just for fun
            Those days are gone
            All by myself
            Don't wanna be all by myself anymore
            Ohh... ohhhh
            All by myself, don't wanna live
            Ehh, eh eh... ehhhh
            Don't wanna live by myself, by myself anymore...
            By myself`,
            audio: "song/All By Myself.mp3"

        },

        
        {
            title: "Have You Ever Seen The Rain",
            artist: "Rod Stewart",
            image: "cover/rsz_1rod_stewart.png",
            lyrics: `Someone told me long ago
            There's a calm before the storm
            I know
            It's been comin' for some time
            When it's over, so they say
            It'll rain a sunny day
            I know
            Shinin' down like water
            I want to know, have you ever seen the rain?
            I want to know, have you ever seen the rain
            Comin' down on a sunny day?
            Yesterday, and days before
            Sun is cold and rain is hard
            I know
            Been that way for all my time
            'Til forever, on it goes
            Through the circle, fast and slow
            I know
            It can't stop, I wonder
            I want to know, have you ever seen the rain?
            I want to know, have you ever seen the rain
            Comin' down on a sunny day?
            Yeah
            I want to know, have you ever seen the rain?
            I want to know, have you ever seen the rain
            Comin' down on a sunny day?`,
            audio: "song/Have You Ever See The Raim.mp3"

        },

        {
            title: "Kangen",
            artist: "Dewa 19",
            image: "cover/dewa.png",
            lyrics: `Kut'rima suratmu, t'lah kubaca, dan aku mengerti
            Betapa merindunya dirimu, akan hadirnya diriku
            di dalam hari-harimu, bersama lagi
            Kau bertanya padaku, kapan aku, akan kembali lagi
            Katamu kau tak kuasa, menahan gejolak di dalam dada
            yang membara menahan rasa, pertemuan kita nanti
            Saat kau ada disisiku
            Semua kata rindumu semakin membuatku, tak berdaya
            menahan rasa ingin jumpa
            Percayalah padaku akupun rindu kamu
            Ku akan pulang, melepas semua
            kerinduan, yang terpendam
            Kau tuliskan padaku, kata cinta, yang manis dalam suratmu
            Kau katakan padaku, saat ini, ku ingin hangat pelukmu
            dan belai lembut kasihmu, takkan kulupa s'lamanya
            Saat bersama dirimu
            Jangan katakan cinta, menambah beban rasa
            Sudah simpan saja sedihmu itu, ku akan datang`,
            audio: "song/Kangen.mp3"

        },

        {
            title: "Heaven",
            artist: "Bryan Adams",
            image: "cover/Heaven.png",
            lyrics: `Oh - thinkin' about all our younger years
            There was only you and me
            We were young and wild and free
            
            Now nothin' can take you away from me
            We bin down that road before
            But that's over now
            You keep me comin' back for more
            
            Baby you're all that I want
            When you're lyin' here in my arms
            I'm findin' it hard to believe
            We're in heaven
            And love is all that I need
            And I found it there in your heart
            It isn't too hard to see
            We're in heaven
            
            Oh - once in your life you find someone
            Who will turn your world around
            Bring you up when you're feelin' down
            
            Ya - nothin' could change what you mean to me
            Oh there's lots that I could say
            But just hold me now
            Cause our love will light the way
            
            N' baby you're all that I want
            When you're lyin' here in my arms
            I'm findin' it hard to believe
            We're in heaven
            And love is all that I need
            And I found it there in your heart
            It isn't too hard to see
            We're in heaven
            
            I've bin waitin' for so long
            For something to arrive
            For love to come along
            
            Now our dreams are comin' true
            Through the good times and the bad
            Ya - I'll be standin' there by you`,
            audio: "song/Heaven.mp3"
        },
        {
            title: "Fe!n",
            artist: "Travis Scott",
            image: "cover/travis scott.png",
            lyrics: `Just come outside for the night (yeah)
            Take your time, get your light (yeah)
            Johnny Dang, huh-uh
            I been out geekin'
            Bitch
            Fein', fein', fein', fein'-fein' (yeah)
            Fein', fein', fein', fein'-fein' (yeah)
            Fein', fein', fein', fein'-fein'
            Fein', fein', fein', fein' (yeah)
            The career's more at stake when you in your prime (at stake)
            Fuck that paper, baby, my face on the dotted line (dot, yeah)
            I been flyin' out of town for some peace of mind (yeah, yeah, bitch)
            It's like always they just want a piece of mine (ah)
            I been focused on the future, never on right now (ah)
            But I'm sippin' that kombucha, either pink or brown (it's lit)
            I'm the one that introduced you to the you right now (mm, let's go)
            Oh my God, that bitch bite (that bitch bite)
            But alright (alright), tryna vibe (tryna vibe this)
            In the night, come alive
            Ain't asleep, ain't a-, ain't a-, ain't-ain't-ain't-
            Fein', fein', fein', fein'-fein'
            Fein', fein', fein', fein'-fein'
            Fein', fein', fein', fein'-fein'
            Fein', fein', fein', fein', fein'
            Fein', fein', fein'
            Syrup, whoa, what?
            What?
            (Homixide, Homixide, Homixide, Homixide) what?
            (Yeah, whoa, yeah, yeah)
            (Homixide, Homixide, Homixide, Homixide, yeah)
            (Yeah, hol' up, yeah)
            Yeah, I just been poppin' my shit it's been gettin' live, hol' up (shit)
            Yeah, you try to come wrong 'bout this shit, we poppin' ya tires, hol' up (shit)
            Uh, hunnid round, whoa, feelin' like I'm on ten
            Playin' both sides with these hoes (hol' up)
            Shawty, I'm fuckin' yo' friends (hol' up)
            I been goin' crazy, shawty, I've been in the deep end
            She not innocent, uh, shit, she tryna go
            Fein', fein' (talm 'bout), fein', fein'-fein'-fein' (yeah, syrup, oh-oh, what?)
            Fein', fein', fein', fein'-fein'-fein' (syrup, oh-oh)
            Fein', fein', fein', fein'-fein'-fein' (talm 'bout, talm 'bout, let's go)
            I just been icin' my hoes
            I just been drippin' my ho (drippin' my ho)
            This is a whole 'nother level, shawty
            I got these hoes on they toes (hoes on they toes)
            I put the bitch on the road
            She tryna fuck on the O, hol' up, hol' up
            I got this ho with me, she tryna show me some', hol' up, hol' up
            I got flows for days, these niggas ain't knowin' none, hol' up, hol' up
            Me and my bro locked in, you know we on one, hol' up (slatt, slatt)
            We in the spot goin' crazy, until the sun up
            You worried about that ho, that ho done chose us (slatt, bitch-ass)
            Uh, pistols all in the kitchen, can't give the zip code up, hol' up, yeah (wow)
            Fein', fein', fein' (hol' up, hol' up, huh, yeah)
            Why the fuck these niggas actin' like they know us?
            Double O, Cactus, yeah, we towed up, uh (skrrt, skrrt)
            Switch out the bag, these niggas get rolled up, hol' up, slatt (it's lit)
            Everything hit, hol' up
            Everything Homixide, Homixide (Homixide, Homixide, Homixide, Homixide)
            Fein', fein', fein', fein'-fein'-fein'
            (Homixide, Homixide, Homixide, Homixide, Homixide, Homixide, Homixide)`,
            audio: "song/Fein.mp3"

        },

        {
            title: "Starboy",
            artist: "The Weekend",
            image: "cover/Starboy.png",
            lyrics: `I'm tryna put you in the worst mood, ah
            P1 cleaner than your church shoes, ah
            Milli point two just to hurt you, ah
            All red Lamb' just to tease you, ah
            None of these toys on lease too, ah
            Made your whole year in a week too, yeah
            Main bitch outta your league too, ah
            Side bitch out of your league too, ah
            House so empty, need a centerpiece
            Twenty racks a table cut from ebony
            Cut that ivory into skinny pieces
            Then she clean it with her face, man, I love my baby, ah
            You talkin' money, need a hearing aid
            You talkin' 'bout me, I don't see the shade
            Switch up my style, I take any lane
            I switch up my cup, I kill any pain
            Look what you've done
            I'm a motherfuckin' starboy
            Look what you've done
            I'm a motherfuckin' starboy
            Every day a nigga try to test me, ah
            Every day a nigga try to end me, ah
            Pull off in that Roadster SV, ah
            Pockets overweight, gettin' hefty, ah
            Coming for the king, that's a far cry, ah
            I come alive in the fall time, I
            The competition, I don't really listen
            I'm in the blue Mulsanne bumping New Edition
            House so empty, need a centerpiece
            Twenty racks a table cut from ebony
            Cut that ivory into skinny pieces
            Then she clean it with her face, man, I love my baby, ah
            You talkin' money, need a hearing aid
            You talkin' 'bout me, I don't see the shade
            Switch up my style, I take any lane
            I switch up my cup, I kill any pain
            Look what you've done
            I'm a motherfuckin' starboy
            Look what you've done
            I'm a motherfuckin' starboy
            Let a nigga brag Pitt
            Legend of the fall, took the year like a bandit
            Bought mama a crib and a brand new wagon
            Now she hit the grocery shop looking lavish
            Star Trek roof in that Wraith of Khan
            Girls get loose when they hear this song
            A hundred on the dash get me close to God
            We don't pray for love, we just pray for cars
            House so empty, need a centerpiece
            Twenty racks a table cut from ebony
            Cut that ivory into skinny pieces
            Then she clean it with her face, man, I love my baby, ah
            You talkin' money, need a hearing aid
            You talkin' 'bout me, I don't see the shade
            Switch up my style, I take any lane
            I switch up my cup, I kill any pain
            Look what you've done
            I'm a motherfuckin' starboy
            Look what you've done
            I'm a motherfuckin' starboy
            Look what you've done
            I'm a motherfuckin' starboy
            Look what you've done
            I'm a motherfuckin' starboy`,
            audio: "song/Starboy.mp3"

        }
    ];

    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.addEventListener("click", function() {
            const selectedSong = songs[index];
            localStorage.setItem("selectedSong", JSON.stringify(selectedSong));
            window.location.href = "songDetail.html";
        });
    });
});

