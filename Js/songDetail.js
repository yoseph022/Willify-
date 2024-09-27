document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("play");
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const songInfo = document.querySelector(".songInfo");
    const songTime = document.querySelector(".songTime");
    const seekbar = document.querySelector(".seekbar");
    const circle = document.querySelector(".circle");
    const audioPlayerr = document.querySelector("audio-player");
    
    const songData = JSON.parse(localStorage.getItem("selectedSong"));

    if (songData) {
        songInfo.textContent = `${songData.title} - ${songData.artist}`;
        audioPlayer.src = songData.audio;
    }

    let isPlaying = false;


    function formatTime(timeInSeconds) {
        const totalSeconds = Math.floor(timeInSeconds);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    
    let currentSongIndex = 0;

    
    function updateSongInfo(songs) {
        const currentSong = songs[currentSongIndex];
        songInfo.textContent = `${currentSong.title} - ${currentSong.artist}`;
        songTime.textContent = currentSong.duration;
        audioPlayer.src = currentSong.audio; // Update audio
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
    
    if (previousButton) {
        previousButton.addEventListener("click", function() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            updateSongInfo();
            if (isPlaying) audioPlayer.play();
        });
    }
    if (nextButton) {
        nextButton.addEventListener("click", function() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            updateSongInfo();
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
            title: "Heat Waves",
            artist: "Glass Animals",
            image: "cover/Heat Waves.png",
            lyrics: `IRoad shimmer wigglin' the vision
            Heat, heat waves, I'm swimmin' in a mirror
            Road shimmer wigglin' the vision
            Heat, heat waves, I'm swimmin' in a
            Sometimes, all I think about is you
            Late nights in the middle of June
            Heat waves been fakin' me out
            Can't make you happier now
            Sometimes, all I think about is you
            Late nights in the middle of June
            Heat waves been fakin' me out
            Can't make you happier now
            Usually I put somethin' on TV
            So we never think about you and me
            But today I see our reflections
            Clearly in Hollywood, layin' on the screen
            You just need a better life than this
            You need somethin' I can never give
            Fake water all across the road
            It's gone now, the night has come, but
            Sometimes, all I think about is you
            Late nights in the middle of June
            Heat waves been fakin' me out
            Can't make you happier now
            You can't fight it, you can't breathe
            You say something so lovin', but
            Now I gotta let you go
            You'll be better off in someone new
            I don't wanna be alone
            You know it hurts me too
            You look so broken when you cry
            One more and then I say goodbye
            Sometimes, all I think about is you
            Late nights in the middle of June
            Heat waves been fakin' me out
            Can't make you happier now
            Sometimes, all I think about is you
            Late nights in the middle of June
            Heat waves been fakin' me out
            Can't make you happier now
            I just wonder what you're dreamin' of
            When you sleep and smile so comfortable
            I just wish that I could give you that
            That look that's perfectly un-sad
            Sometimes, all I think about is you
            Late nights in the middle of June
            Heat waves been fakin' me out
            Heat waves been fakin' me out
            Sometimes, all I think about is you
            Late nights in the middle of June
            Heat waves been fakin' me out
            Can't make you happier now
            Sometimes, all I think about is you
            Late nights in the middle of June
            Heat waves been fakin' me out
            Can't make you happier now
            Road shimmer wigglin' the vision
            Heat, heat waves, I'm swimmin' in a mirror
            Road shimmer wigglin' the vision
            Heat, heat waves, I'm swimmin' in a mirror
            `,
            audio: "song/Heat Waves.mp3"

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
            title: "Let It Snow",
            artist: "Dean Martin",
            image: "cover/Dean Martin.png",
            lyrics: `Oh, the weather outside is frightful
            But the fire is so delightful
            And since we've no place to go
            Let it snow! Let it snow! Let it snow!
            Man it doesn't show signs of stopping
            And I brought me some corn for popping
            The lights are turned way down low
            Let it snow! Let it snow!
            When we finally kiss goodnight
            How I'll hate going out in the storm
            But if you'll really hold me tight
            All the way home I'll be warm
            And the fire is slowly dying
            And, my dear, we're still goodbying
            But as long as you'd love me so
            Let it snow! Let it snow and snow!
            When we finally kiss goodnight
            How I'll hate going out in the storm
            But if you really grab me tight
            All the way home I'll be warm
            Oh, the fire is slowly dying
            And, my dear, we're still goodbying
            But as long as you'd love me so
            Let it snow, let it snow, let it snow!
            `,
            audio: "song/Let It Snow.mp3"

        },
        {
            title: "How deep is your Love",
            artist: "Bee Gees",
            image: "cover/bee gees.png",
            lyrics: `I know your eyes in the morning sun
            I feel you touch me in the pouring rain
            And the moment that you wander far from me
            I wanna feel you in my arms again
            And you come to me on a summer breeze
            Keep me warm in your love, then you softly leave
            And it's me you need to show
            How deep is your love?
            How deep is your love?
            How deep is your love?
            I really mean to learn
            'Cause we're living in a world of fools
            Breaking us down when they all should let us be
            We belong to you and me
            I believe in you
            You know the door to my very soul
            You're the light in my deepest, darkest hour
            You're my savior when I fall
            And you may not think I care for you
            When you know down inside that I really do
            And it's me you need to show
            How deep is your love?
            How deep is your love?
            How deep is your love?
            I really mean to learn
            'Cause we're living in a world of fools
            Breaking us down when they all should let us be
            We belong to you and me
            Na-na-na-na-na
            Na-na-na-na-na-na-na-na
            Na-na-na-na-na-na-na-na-na
            Na-na-na-na-na-na-na
            And you come to me on a summer breeze
            Keep me warm in your love, then you softly leave
            And it's me you need to show
            How deep is your love?
            How deep is your love?
            How deep is your love?
            I really mean to learn
            'Cause we're living in a world of fools
            Breaking us down when they all should let us be
            We belong to you and me (na-na-na-na-na)
            How deep is your love?
            How deep is your love?
            I really mean to learn
            'Cause we're living in a world of fools
            Breaking us down when they all should let us be
            We belong to you and me (na-na-na-na-na)
            How deep is your love?
            How deep is your love?
            I really mean to learn
            'Cause we're living in a world of fools
            Breaking us down when they all should let us be
            We belong to you and me
            `,
            audio: "song/How Deep Is Your Love.mp3"
        },
        {
            title: "Black Or White",
            artist: "Michael Jackson",
            image: "cover/michael jackson.png",
            lyrics: `I took my baby on a Saturday bang
            Boy is that girl with you?
            Yes we're one and the same
            Now I believe in miracles
            And a miracle has happened tonight
            But, if you're thinkin' about my baby
            It don't matter if you're black or white
            They print my message in the Saturday Sun
            I had to tell them I ain't second to none
            And I told about equality and it's true
            Either you're wrong or you're right
            But, if you're thinkin' about my baby
            It don't matter if you're black or white
            I am tired of this devil
            I am tired of this stuff
            I am tired of this business
            Sew when the going gets rough
            I ain't scared of your brother
            I ain't scared of no sheets
            I ain't scared of nobody
            Girl, when the going gets mean
            Protection
            For gangs, clubs, and nations
            Causing grief in human relations
            It's a turf war on a global scale
            I'd rather hear both sides of the tale
            See, it's not about races
            Just places, faces
            Where your blood comes from
            Is were your space is
            I've seen the bright get duller
            I'm not going to spend my life being a color
            Don't tell me you agree with me
            When I saw you kicking dirt in my eye
            But, if you're thinkin' about my baby
            It don't matter if you're black or white
            I said if you're thinkin' of being my baby
            It don't matter if you're black or white
            I said if you're thinkin' of being my brother
            It don't matter if you're black or white
            Ooh, ooh
            Yea, yea, yea now
            Ooh, ooh
            Yea, yea, yea now
            It's black, it's white
            It's tough for you to get by (yeah, yeah, yeah)
            It's black, it's white
            It's black, it's white
            It's tough for you to get by (yeah, yeah, yeah)
            It's black, it's white.`,
            audio: "song/Black Or White.mp3"
        },
        {
            title: "Cant Take My Eyes Off You",
            artist: "Engelbert Humperdinck",
            image: "cover/Engelbert.png",
            lyrics: `You're just too good to be true
            Can't take my eyes off of you
            You'd be like Heaven to touch
            I wanna hold you so much
            At long last, love has arrived
            And I thank God I'm alive
            You're just too good to be true
            Can't take my eyes off of you
            Pardon the way that I stare
            There's nothin' else to compare
            The sight of you leaves me weak
            There are no words left to speak
            But if you feel like I feel
            Please let me know that it's real
            You're just too good to be true
            Can't take my eyes off of you
            I love you, baby
            And if it's quite alright
            I need you, baby
            To warm the lonely night
            I love you, baby
            Trust in me when I say
            Oh, pretty baby
            Don't bring me down, I pray
            Oh, pretty baby
            Now that I've found you, stay
            And let me love you, baby
            Let me love you
            You're just too good to be true
            Can't take my eyes off of you
            You'd be like Heaven to touch
            I wanna hold you so much
            At long last, love has arrived
            And I thank God I'm alive
            You're just too good to be true
            Can't take my eyes off you
            I love you, baby
            And if it's quite alright
            I need you, baby
            To warm the lonely night
            I love you, baby
            Trust in me when I say
            Oh, pretty baby
            Don't bring me down, I pray
            Oh, pretty baby
            Now that I've found you, stay
            Oh, pretty baby
            Trust in me when I say
            Oh, pretty baby`,
            audio: "song/Cant Take My Eyes Off You.mp3"
        },
        {
            title: "Out Of Time",
            artist: "The Weekend",
            image: "cover/weekend.png",
            lyrics: `Yeah, yeah
            The last few months, I've been working on me, baby
            There's so much trauma in my life
            I've been so cold to the ones who loved me, baby
            I look back now and I realize
            I remember when I held you
            You begged me with your drowning eyes to stay
            And I regret I didn't tell you
            Now I can't keep you from loving him, you made up your mind
            Say I love you, girl, but I'm out of time
            Say I'm there for you, but I'm out of time
            Say that I'll care for you, but I'm out of time
            Said, I'm too late to make you mine, out of time (ah)
            If he mess up just a little, baby, you know my line
            If you don't trust him a little, then come right back, girl, come right back
            Gimme one chance, just a little, baby, I'll treat you right
            And I'll love you like I should've loved you all the time
            And I remember when I held you (held you, baby)
            You begged me with your drowning eyes to stay (never again, baby)
            And I regret I didn't tell you
            Now I can't keep you from loving him, you made up your mind (uh)
            Say I love you, girl, but I'm out of time
            Say I'm there for you, but I'm out of time (no)
            Say that I'll care for you, but I'm out of time (hey)
            Said, I'm too late to make you mine, out of time (ah)
            Ooh-ooh-ooh, singing (out of time)
            Said, I had you to myself, but I'm (out of time)
            Say that I'll care for you, but I'm out of time
            But I'm too late to make you mine, out of time (uh)
            Out of time, out of time
            Don't you dare touch that dial
            Because like the song says, you are out of time
            You're almost there, but don't panic
            There's still more music to come before you're completely engulfed
            In the blissful embrace of that little light you see in the distance
            Soon you'll be healed, forgiven, and refreshed, free from all trauma, pain, guilt, and shame
            You may even forget your own name, but before you dwell in that house forever
            Here's 30 minutes of easy listening to some slow tracks, on 103.5 Dawn FM`,
            audio: "song/Out Of Time.mp3"
        },
        {
            title: "Goodbye",
            artist: "Air Supply",
            image: "cover/air supply.png",
            lyrics: `I can see the pain living in your eyes
            And I know how hard you try
            You deserve to have so much more
            I can feel your heart and I sympathize
            And I'll never criticize all you've ever meant to my life
            I don't want to let you down
            I don't want to lead you on
            I don't want to hold you back
            From where you might belong
            You would never ask me why
            My heart is so disguised
            I just can't live a lie anymore
            I would rather hurt myself
            Than to ever make you cry
            There's nothing left to say but good-bye
            You deserve the chance at the kind of love
            I'm not sure I'm worthy of
            Losing you is painful to me
            My heart is so disguised
            I just can't live a lie anymore
            I would rather hurt myself
            Than to ever make you cry
            There's nothing left to try
            Though it's gonna hurt us both
            There's no other way than to say good-bye`,
            audio: "song/Goodbye.mp3"
        },
        {
            title: "Sway",
            artist: "Michael Bubble",
            image: "cover/Michael Bubble.png",
            lyrics: `When marimba rhythms start to play
            Dance with me, make me sway
            Like a lazy ocean hugs the shore
            Hold me close, sway me more
            Like a flower bending in the breeze
            Bend with me, sway with ease
            When we dance, you have a way with me
            Stay with me, sway with me
            Other dancers may be on the floor
            Dear, but my eyes will see only you
            Only you have that magic technique
            When we sway, I go weak
            I can hear the sounds of violins
            Long before it begins
            Make me thrill as only you know how
            Sway me smooth, sway me now
            Other dancers may be on the floor
            Dear, but my eyes will see only you
            Only you have that magic technique
            When we sway, I go weak
            I can hear the sounds of violins
            Long before it begins
            Make me thrill as only you know how
            Sway me smooth, sway me now
            When marimba rhythms start to play
            Dance with me, make me sway
            Like a lazy ocean hugs the shore
            Hold me close, sway me more
            Like a flower bending in the breeze
            Bend with me, sway with ease
            When we dance you have a way with me
            Stay with me, sway with me
            When marimbas start to play
            Hold me close, make me sway
            Like a lazy ocean hugs the shore
            Hold me close, sway me more
            Like a flower bending in the breeze
            Bend with me, sway with ease
            When we dance, you have a way with me
            Stay with me, sway with me
            `,
            audio: "song/Sway.mp3"
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
            title: "Smooth Operator",
            artist: "Sade",
            image: "cover/rsz_jade.png",
            lyrics: `Diamond life, lover boy
            We move in space with minimum waste and maximum joy
            City lights and business nights
            When you require streetcar desire for higher heights
            No place for beginners or sensitive hearts
            When sentiment is left to chance
            No place to be ending but somewhere to start
            No need to ask
            He's a smooth operator
            Smooth operator
            Smooth operator
            Smooth operator
            Coast to coast, LA to Chicago, western male
            Across the north and south, to Key Largo, love for sale
            Face to face, each classic case
            We shadow box and double cross
            Yet need the chase
            A license to love, insurance to hold
            Melts all your memories and change into gold
            His eyes are like angels but his heart is cold
            No need to ask
            He's a smooth operator
            Smooth operator
            Smooth operator
            Smooth operator
            Coast to coast, LA to Chicago, western male
            Across the north and south, to Key Largo, love for sale
            Smooth operator
            Smooth operator
            Smooth operator
            Smooth operator
            Smooth operator
            Smooth operator
            Smooth operator
            Smooth operator
            Smooth operator
            Smooth operator
            Smooth operator`,
            audio: "song/Smooth Operator.mp3"
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