const users = {
    user1: {
        userName: '@elonmusk',
        displayName: 'Elon Musk',
        joinedDate: 'June 2009',
        followingCount: 103,
        followerCount: 47900000,
        avatarURL: 'assets/elonmusk.jpg',
        coverPhotoURL: 'assets/elonmusk-cover.jpeg',
        tweets: [
            {
                text: 'I admit to judging books by their cover',
                timestamp: '2/10/2021 00:01:20'
            },
            {
                text: 'Starship to the moon',
                timestamp: '2/09/2021 18:37:12'
            },
            {
                text: 'Out on launch pad, engine swap underway',
                timestamp: '2/09/2021 12:11:51'
            }
        ]
    },

    user2: {
        userName: '@BillGates',
        displayName: 'Bill Gates',
        joinedDate: 'June 2009',
        followingCount: 274,
        followerCount: 53800000,
        avatarURL: 'assets/billgates.jpg',
        coverPhotoURL: 'assets/billgates-cover.jpeg',
        tweets: [
            {
                text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
                timestamp: '2/10/2021 00:01:20'
            },
            {
                text: 'Should I start tweeting memes? Let me know in a comment.',
                timestamp: '2/09/2021 18:37:12'
            },
            {
                text: 'In 2020, I read a book every hour.',
                timestamp: '2/09/2021 12:11:51'
            }
        ]
    }
}
if (window.location.href === 'http://127.0.0.1:5500/index.html') {
    window.history.pushState('', '', 'http://127.0.0.1:5500/index.html?users=user1')
}


const getParameters = (paramName) => {
    const queryString = window.location.search;
    let parameters = new URLSearchParams(queryString);
    return parameters.get(paramName)
}

let value = getParameters('users')
let paramsValue = users[`${value}`]

const header = document.querySelector('.header')
const backArrow = document.createElement('div');
const timelineLink = document.createElement('a');
if (header) {
    timelineLink.classList.add('timeline-link');
    timelineLink.href = '/timeline.html'
    timelineLink.innerText = 'Time Line'
    header.append(timelineLink)
    backArrow.classList.add('fas', 'fa-arrow-left');
    header.append(backArrow)
    const nameDisplay = document.createElement('div')
    nameDisplay.classList.add('name-display')
    nameDisplay.innerHTML = `
    <h2 class= "users-name">${paramsValue.displayName}</h2>
    <h3 class= "num-of-tweets small-text">${paramsValue.tweets.length} Tweets</h3>
    `;
    header.appendChild(nameDisplay);
}

const coverContainer = document.querySelector('.cover-container');
if (coverContainer) {
    coverContainer.innerHTML = `
        <img class= "cover-img" src="${paramsValue.coverPhotoURL}"></img>
        <img class = "avatar-img" src="${paramsValue.avatarURL}"></img>
    `
    const countRounder = (num) => {
        let roundedNum = Math.abs(Number(num))
        return roundedNum >= 1.0e+6
            ? (roundedNum) / 1.0e+6.toFixed(2) + "M"
            : (roundedNum) >= 1.0e+3
                ? roundedNum / 1.0e+3.toFixed(2) + "k"
                : Math.abs(roundedNum)
    }

    const followingCountRounded = countRounder(`${paramsValue.followingCount}`);
    const followerCountRounded = countRounder(`${paramsValue.followerCount}`)

    const profileDetailsContainer = document.querySelector('.profile-details-container');
    profileDetailsContainer.innerHTML = `
            <div class="follow-button-container">
                <button class="follow-btn">Following</button>
            </div>
            <h2 class="users-name">${paramsValue.displayName}</h2>
            <h3 class="twitter-handle ">${paramsValue.userName}</h3>
            <h4 class="profile-details">Joined ${paramsValue.joinedDate}<br>
            <span>${followingCountRounded}</span>&nbsp;Following&nbsp; &nbsp;
            <span>${followerCountRounded}</span>&nbsp;Followers</h4>
            `

    const profileDetails = document.querySelector('.profile-details');
    const calendarIcon = document.createElement('img');
    calendarIcon.classList.add('calendar-icon');
    calendarIcon.src = "assets/calendar-icon.svg"
    profileDetails.prepend(calendarIcon);

    const tabsContainer = document.createElement('div');
    tabsContainer.classList.add('tabs-container')
    profileDetailsContainer.append(tabsContainer)
    tabsContainer.innerHTML = `
            <button class="tab">Tweets</button>
            <button class="tab">Tweets & replies</button>
            <button class="tab">Media</button>
            <button class="tab">Likes</button>
            `
}

const focusedTab = document.querySelector('.tab').focus();
window.addEventListener('load', focusedTab);


const tweetsContainer = document.querySelector('.tweets-container');
if (tweetsContainer) {
    const tweetsMade = paramsValue.tweets
    tweetsMade.forEach(tweet => {
        function timeDiffCalc(currentDate, tweetDate) {
            let diffInSeconds = Math.abs(currentDate - tweetDate) / 1000;
            const days = Math.floor(diffInSeconds / 86400);
            const hours = Math.floor(diffInSeconds / 3600) % 24;
            const minutes = Math.floor(diffInSeconds / 60) % 60;
            let timeDiffFromTweet = ''
            if (days < 1 && minutes <= 1) {
                timeDiffFromTweet = `${hours}h`
            } else if (days < 1 && hours < 1) {
                timeDiffFromTweet = `${minutes}m`
            } else {
                timeDiffFromTweet = `${days}d`
            }
            return timeDiffFromTweet
        }
        let tweetTime = tweet.timestamp
        let tweetTimeDate = (new Date(tweetTime))
        let tweetedDate = tweetTimeDate.getTime()
        let currDate = new Date().getTime()

        const itsTime = (timeDiffCalc(tweetedDate, currDate))
        const tweetDiv = document.createElement('div')
        tweetDiv.classList.add('tweet-holder')
        tweetDiv.innerHTML = `
            <div class="img-container">
                <img class="tweet-img" src="${paramsValue.avatarURL}"></img>
            </div>
            <div class="tweet-details">
                    <div class="circle-holder">
                    <svg viewbox="0 0 24 24">
                    <circle cx="5" cy="12" r="2"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="19" cy="12" r="2"></circle>
                    </svg>
                    </div>
                <div class ="tweet-heading">
                    <h2 class="users-name">${paramsValue.displayName}</h2>
                    <h3 class="twitter-handle">${paramsValue.userName}</h3>
                    <span class="middle-dot">·</span>
                    <div class="time-from-now">${itsTime}</div>  
                </div>
                <p class="tweet-text">${tweet.text}</p>
                <div class="tweet-interactions">
                <div class="svg-container">
                <svg viewbox="0 0 24 24">
                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z">
                </path>
                </svg>
                </div>
                 <div class="svg-container">
                <svg viewbox="0 0 24 24">
                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z">
                </path>
                </svg>
                </div>
                 <div class="svg-container">
                <svg viewbox="0 0 24 24">
                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"> 
                </path>
                </svg>
                </div>
                 <div class="svg-container">
                <svg viewbox="0 0 24 24">
                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z">
                </path>
                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z">
                </path
                </svg>
                </div>
                </div>
            </div>
        `
        tweetsContainer.append(tweetDiv)
    })


}
const usersNameVerified = document.querySelectorAll('.users-name');
usersNameVerified.forEach(element => {
    const verifiedSymbol = document.createElement('img');
    verifiedSymbol.classList.add('verified-img')
    verifiedSymbol.src = "assets/twitter-verified-badge.svg"
    element.append(verifiedSymbol);
})

const tweetedContainer = document.querySelector('.tweeted-container');
const backTabHeader = document.createElement('div');
const secondBackArrow = document.createElement('a');

if (tweetedContainer) {
    backTabHeader.classList.add('back-header')
    secondBackArrow.classList.add('fas', 'fa-arrow-left')
    secondBackArrow.href = 'javascript:history.go(-1)'
    tweetedContainer.append(backTabHeader)
    backTabHeader.append(secondBackArrow)

    let arrOfOrderedTweetDates = []
    const objectArray = Object.entries(users)
    objectArray.forEach(([key, value]) => {
        const allTweets = value.tweets
        for (let tweet of allTweets) {
            let tweetTimestamp = new Date(tweet.timestamp).getTime()
            arrOfOrderedTweetDates.push({ key, tweet, tweetTimestamp })
        }
        arrOfOrderedTweetDates.sort((a, b) => {
            return (b.tweetTimestamp - a.tweetTimestamp)
        })

    })
    arrOfOrderedTweetDates.forEach(tweet => {
        let tweetKey = tweet.key;
        let tweetText = tweet.tweet.text
        let tweetTime = tweet.tweet.timestamp
        const tweetDiv = document.createElement('div')
        tweetDiv.classList.add('tweet-holder')
        tweetDiv.innerHTML = `
                <div class="img-container">
                    <img class="tweet-img" src="${users[tweetKey].avatarURL}"></img>
                </div>
                <div class="tweet-details">
                        <div class="circle-holder">
                        <svg viewbox="0 0 24 24">
                        <circle cx="5" cy="12" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="19" cy="12" r="2"></circle>
                        </svg>
                        </div>
                    <div class ="tweet-heading">
                        <h2 class="users-name">${users[tweetKey].displayName}</h2>
                        <h3 class="twitter-handle">${users[tweetKey].userName}</h3>
                        <span class="middle-dot">·</span>
                        <div class="time-from-now">${tweetTime}</div>  
                    </div>
                    <p class="tweet-text">${tweetText}</p>
                    <div class="tweet-interactions">
                    <div class="svg-container">
                    <svg viewbox="0 0 24 24">
                    <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z">
                    </path>
                    </svg>
                    </div>
                     <div class="svg-container">
                    <svg viewbox="0 0 24 24">
                    <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z">
                    </path>
                    </svg>
                    </div>
                     <div class="svg-container">
                    <svg viewbox="0 0 24 24">
                    <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"> 
                    </path>
                    </svg>
                    </div>
                     <div class="svg-container">
                    <svg viewbox="0 0 24 24">
                    <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z">
                    </path>
                    <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z">
                    </path
                    </svg>
                    </div>
                    </div>
                </div>
            `
        tweetedContainer.append(tweetDiv)
    })
}







