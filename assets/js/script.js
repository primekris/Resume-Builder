

// form repeater
$(document).ready(function(){
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show:function(){
            $(this).slideDown();
        },
        hide: function(deleteElement){
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    })
})


// Telegram upload form code here 👇
const uploadForm = document.getElementById("uploadForm");
const toast = document.getElementById("toast");

if (uploadForm) {
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
      showToast("⚠️ Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const backendURL = "https://telegram-file-uploader-hy9e.onrender.com/upload";

    try {
      const res = await fetch(backendURL, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.status === "success") {
        showToast("✅ File sent to Telegram!");
        uploadForm.reset();
      } else {
        showToast("❌ Upload failed.");
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Something went wrong.");
    }
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.style.visibility = "visible";
  toast.style.opacity = "1";
  toast.style.bottom = "50px";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.bottom = "30px";
    setTimeout(() => {
      toast.style.visibility = "hidden";
    }, 500);
  }, 3000);
}
