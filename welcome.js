
document.querySelector('.w-btn').addEventListener('click',function(){
    // sessionStorage.clear();
    let obj ={
        Name : document.querySelector('.w-name').value,
        Email : document.querySelector('.w-email').value,
        Level : document.querySelector('.w-level').selectedIndex,
    }
    let arr = [];
    arr.push(obj);
    sessionStorage.setItem('array',JSON.stringify(arr));
    console.log(obj.Level);
});