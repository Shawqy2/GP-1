document.addEventListener("DOMContentLoaded", function() {
    // تحميل البيانات من LocalStorage
    let storedName = localStorage.getItem("profile_name") || "Shawqy Hussien";
    let storedEmail = localStorage.getItem("profile_email") || "shawqyhussien72@gmail.com";
    let storedPhone = localStorage.getItem("profile_phone") || "+201155397963";
    let storedAddress = localStorage.getItem("profile_address") || "...";
    let storedPic = localStorage.getItem("profile_pic") || "../media/images/TEAM.jpg";

    // تحديث القيم في الصفحة
    document.getElementById("profile-name").textContent = storedName;
    document.getElementById("profile-email").textContent = storedEmail;
    document.getElementById("profile-phone").textContent = storedPhone;
    document.getElementById("profile-address").textContent = storedAddress;
    document.getElementById("profile-pic").src = storedPic;

    // تغيير الصورة عند اختيار ملف جديد
    document.getElementById("upload-pic").addEventListener("change", function(event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let imageUrl = e.target.result;
                document.getElementById("profile-pic").src = imageUrl;
                localStorage.setItem("profile_pic", imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });

    // زر تعديل البروفايل
    document.getElementById("edit-profile").addEventListener("click", function() {
        window.location.href = "edit-profile.html";
    });
});
