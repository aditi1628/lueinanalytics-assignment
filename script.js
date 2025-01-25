//sample data
const videos = [
  {
    title: "Video 1: Introduction",
    duration: "10:30",
    views: 500,
    completed: false,
  },
  {
    title: "Video 2: Basics",
    duration: "15:20",
    views: 1200,
    completed: false,
  },
  {
    title: "Video 3: Advanced",
    duration: "20:45",
    views: 900,
    completed: false,
  },
];

//Populate video list
const videoList = document.getElementById("videos");
videos.forEach((video, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <p><strong>${video.title}</strong></p>
    <p>Duration: ${video.duration}</p>
    <p>Views: ${video.views}</p>
    <input type="checkbox" id="video-${index}" ${
    video.completed ? "checked" : ""
  }>
    <label for="video-${index}">Mark as Completed</label>
    `;
  videoList.appendChild(li);
});

//Track progress
document
  .querySelectorAll('input[type="checkbox"]')
  .forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
      videos[index].completed = checkbox.checked;
      updateProgress();
    });
  });

function updateProgress() {
  const completed = videos.filter((video) => video.completed).length;
  const progress = Math.round((completed / videos.length) * 100);
  document.getElementById("progress").innerText = `${progress}%`;
  document.querySelector("progress").value = progress;
}

const notesInput = document.getElementById("custom-notes");
const saveButton = document.getElementById("save-notes");

//Load saved notes on page load
notesInput.value = localStorage.getItem("userNotes") || "";

saveButton.addEventListener("click", () => {
  localStorage.setItem("userNotes", notesInput.value);
  alert("Notes saved!");
});

const questions = [
  "What are the key takeaways from this video?",
  "Can you summarize the video in your own words?",
];
document.getElementById("ai-questions").innerHTML = questions
  .map((q) => `<li>${q}</li>`)
  .join("");

function checkCompletion() {
  if (progress == 100) {
    alert("Congratulations! You've completed the course!");
    document.body.innerHTML += `<div class="badge">Course Completed 🏆</div>`;
  }
}

const generateCertificate = () => {
  const doc = new jsPDF();
  doc.text("Certificate of Completion", 20, 20);
  doc.text("Awarded to: [User Name]", 20, 40);
  doc.text("For completing: [Course Name]", 20, 60);
  doc.save("certificate.pdf");
};
document
  .getElementById("enroll-btn")
  .addEventListener("click", generateCertificate);
