async function demo() {   
    var myTime = performance.now();
    await new Promise(resolve => setTimeout(resolve, 5000));
    var myTime1 = performance.now();
    console.log(`${(myTime1 - myTime) /1000} seconds`);
}

demo()