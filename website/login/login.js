function signUp_btn(){
    window.open("/sign_up", "_self");
}

function login(){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/login");
    xhr.setRequestHeader("Content-Type", "text/login_Request");
    const body = JSON.stringify({
        email : document.getElementsByName("email").item(0).value,
        password : document.getElementsByName("password").item(0).value
    });
    xhr.onload = () => {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log("success full login");
                window.open("/app", "_self")
            }
            else{
                window.alert("wrong login");
                console.log("401 error\n wrong login");
            }
        }
    };
    xhr.send(body);
}