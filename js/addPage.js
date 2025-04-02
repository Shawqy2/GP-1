function clearForm() {
    if (confirm('Are you sure you want to empty the form?')) {
        // مسح الحقول النصية
        document.getElementById("product_name").value = "";
    document.getElementById("product_price").value = "";
    document.getElementById("product_quantity").value = "";
    document.getElementById("product_description").value = "";
    document.getElementById("dropdown").selectedIndex = 0;

    // إعادة تعيين حقل رفع الصورة
    let fileInput = document.getElementById("product_img");
    let newFileInput = document.createElement("input");
    newFileInput.type = "file";
    newFileInput.id = "product_img";
    newFileInput.name = "product_img";
    newFileInput.accept = "image/*";
    newFileInput.style.display = "none"; // إخفاء الإدخال الجديد
    newFileInput.addEventListener("change", handleImageUpload);

    fileInput.parentNode.replaceChild(newFileInput, fileInput);

    // مسح الصورة المعروضة وإعادة أيقونة الملابس
    let previewImage = document.getElementById("previewImage");
    previewImage.src = "";
    previewImage.style.display = "none";
    document.querySelector(".clothing-icon").style.display = "block";
    }
}

// تحديث تحميل الصورة عند التغيير
function handleImageUpload(event) {
    let file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert("Please select a valid image file.");
            event.target.value = "";
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert("Image size should be less than 2MB.");
            event.target.value = "";
            return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
            let previewImage = document.getElementById("previewImage");
            previewImage.src = e.target.result;
            previewImage.style.display = "block";
            document.querySelector(".clothing-icon").style.display = "none";
        };
        reader.readAsDataURL(file);
    }
}

// ربط الحدث الجديد بحقل رفع الصورة الجديد
document.getElementById("product_img").addEventListener("change", handleImageUpload);
