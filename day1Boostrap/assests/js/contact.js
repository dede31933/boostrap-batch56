function submitData() {
  const inputName = document.getElementById("inputName").value;
  const inputEmail = document.getElementById("inputEmail").value;
  const inputPhone = document.getElementById("inputPhone").value;
  const inputSubject = document.getElementById("inputSubject").value;
  const inputMessage = document.getElementById("inputMessage").value;

  if (inputName === "") {
    alert("Name harus diisi");
    return false;
  }
  if (inputEmail === "") {
    alert("Email harus diisi");
    return false;
  }
  if (inputPhone === "") {
    alert("Phone Number tidak boleh kosong");
    return false;
  }
  if (inputSubject === "") {
    alert("Subject tidak boleh kosong");
    return false;
  }
  if (inputMessage === "") {
    alert("Message tidak boleh kosong");
    return false;
  }

  console.log(
    `Name: ${inputName}\nEmail: ${inputEmail}\nPhone: ${inputPhone}\nSubject: ${inputSubject}\nMessage: ${inputMessage}`
  );

  const myemail = "dedehidayyat57@gmail.com";
  const gmail = encodeURIComponent(inputEmail);
  const body = encodeURIComponent(`Hello, nama saya adalah ${inputName},\nno telepon saya ${inputPhone},\nsaya seorang ${inputSubject}.\n\n${inputMessage}`);

  let a = document.createElement("a");
  a.href = `mailto:${myemail}?subject=${gmail}&body=${body}`;
  a.click();

  return false;
}
