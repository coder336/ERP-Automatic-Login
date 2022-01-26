function fillup() {
  var obj;
  const jsonUrl = chrome.runtime.getURL('info.json');
  fetch(jsonUrl)
  .then(response => {
    return response.json()
  })
  .then(data => {
    document.getElementById('user_id').value = data['roll'];
    document.getElementById('password').value = data['password'];
    document.getElementById("user_id").blur();
    var check = function(){
      var ques = document.getElementById('question').innerHTML;
      if(ques != ""){
        document.getElementById('answer').value = data[ques];
        document.getElementById('loginFormSubmitButton').click();
      }
      else {
        console.log("Not Found");
          setTimeout(check, 1000); // check again in a second
      }
    }
    check();
  });
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fillup
  });
});