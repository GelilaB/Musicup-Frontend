const images = {
    1: require('./1.gif'),
    2: require('./2.gif'),
    3: require('./3.gif'),
    4: require('./4.gif'),
    5: require('./5.gif'),
    6: require('./6.gif'),
 
}

export default function randomImage(){
    let min = 1;
    let max = 6;
    let random = Math.floor(Math.random()*(max-min + 1)) + min;
    return images[random];
}