# 🏡Atithi (Stay-Booking-Platform) 

Atithi is a Smart, Full-Stack stay-booking platform built with MERN stack that seamlessly connects guest with property owner(host). The web app is 
powered by AI to help host to generate professional property description and provide guests with quick, automated summary of reviews. 
It features a robust booking engine that prevents double booking intervals using date-overlap logic and provides host with month wise revenue tracking deshboard
also. The app features Natural Language Search, allowing guests to find perfect stay using simple conversational query intead of rigid filters 

### 🧳What can a "Guest" do?
* Talk to Search Bar: Guest does not need to click several button or to select multiple checkboxes, just need to search like
  "Find me a room for 2 peoples in Indore with facility of wifi , ac , and ev charging under 5000" and the site finds the best matching for you.
* See Summary of Reviews: Instead of wasting time to read every review, the site Summarizes all the reviews and give you the pros and cons of the property along with the final verdict helps guest for decision.
* Pick the Available Dates: Guest can see which dates are available on a calender, to pick the dates and book it.
* Find the Way: Every property has a map attached. We converts address into real location so that you can see exactly where you are staying.

### 💡What can a "Host" do?
* Easy Listing Creation: You don't need to be a expert, Our step-by-step interface makes the process super easy with featuring AI Description Generator that writes a professional description based on just few keywords. 
* Host Dashboard: Manage everything from one place. Your Host Dashboard tracks all your active listings, pending requests, total earning and upcoming checkIns in a clean and organized way.
* Lifecycle Tracking: Stay in control of every guest's journey. You can easily track where the booking is Pending, Confirmed, Ongoing or Completed, so host can know either the property is occupied or empty.
* Month Wise Revenue Analytics: Understand the business growth. The dashboard provides Month-wise revenue chart so the host can see which month bring the most profit.
 
![Home](https://drive.google.com/uc?export=view&id=1U0KJmwbU4ocauz-G_vmrJPCEQo1_Ucm0)


## 🤖AI Integration 
### ✨Natural Language Search: 
You dont't need to click multiple buttons or to select multiple checkboxes, you can just type a normal sentence like 
"I want room in indore for 2 persons that have wifi , ac and ev charging under 5000" and the system fetched best matched listing for you.
#### How it is Built 
* You type a simple sentence in search bar.
* This sentence is sent to AI (Groq\LLM). That read and extracts useful entities from the sentence.
* Now the extracted entities has sent to query builder to builds dynamic query.
* Using this query to find best matched listings for you.
#### Preview: 
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1SaqCWffhaUS7s09ODh3JZtWVbtUvtcJ8" alt="Natural Language Search Demo" width="90%">
</p>

### ✨AI Review Summarizer: 
Reading every reviews is a timewaste. The system summarizes all the reviews for you and generates pros, cons and final verdict for you to make the decision in seconds. 
#### Preview:
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1Xt3rfadh5tD-tzxa1ByqkEu0IU8ziBws" alt="AI Review Summarizer" width="90%">
</p>

### ✨Description Generator: 
Instead for writing long description for yourself, it is time consuming and lead to unprofessional and messy, You just give some keywords like ("Quiet, Fast Wifi, Near Airport") Then the system writes a professional structured and well organized description for you. 
#### Preview:
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1HDND3wYaVIdGxRf6-R5ZZ95Z8k1sam7X" alt="Description Generator" width="90%">
</p>

## 📅Date Overlap Prevention (No Double Booking For Overlap Intervals)
A safety system that makes sure two different guests cannot book the same listing for the same dates or the overlapping intervals.
```
( ReqCheckIn < OldCheckOut And ReqCheckOut > OldCheckIn ) 
```
Imagine the NewBooking(Guest wants) and the OldBooking(Already in Database). The system says there is a "CLASH" if: 
* The New Start happens before the Old End date.
* AND the New End happens before the Old Start date.

For better user experience the already booked dates shown in gray and also unselectable so that guest can not select those dates or intervals also there is a additional check that prevent the forceful booking.
#### Preview:
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1cLFJjC2EzUCs3WWDReaR3DTJ9cm354oG" alt="Dates Overlap" width="90%">
</p>

## 📈Month Wise Revenue: 
The features act as a "Revenue Tracker" for the property owner(Host). it shows a clear chart of how much money the host has earned months wise, helping them see their growth month based .
* The chart only counts bookings that marked as "Completed".
* The system calculates revenue using check-out-date.
* Host can easily see which months bring the most profit.
#### Preview:
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1px4pEr24IKAbAdhiULNkjhBSfGbKVrec" alt="Dates Overlap" width="90%">
</p>

## 🔐Booking Flow Cycle 
The web app follows a step-by-step journey to track the status
1. Pending: When the guest reserve the listing a request has been sent. The host see it on their dashboard and choose to "Approve" or "Reject" it.
2. Approved: Once approved, the system creates a 4-digit passcode and sends it to the guest's email.
3. Check-in: Host uses the passcode which has been sends to guest's email for checkin. Once checkin the status become "Ongoing".
4. Completed: After the Ongoing status host able to complete the booking at this status the revenue is added.
#### Preview:
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1xyrkawPoFhLMEZMHAv5IJU6mArUS8ySV" alt="Manage Bookings" width="90%">
</p>

## ⚡Security & Performance
* Debouncing: In the Search section, I Implemented Debouncing to wait for the user to stop typing for 400ms before firing the request. This saved 60% in API costs.
* Data Pagination: Loading all the listings at once would crash the browser. I used Pagination to load only 12 to 15 listings at a time. As user clicks "Next", the next batch is fetchhed, keeps the website fast.
* MongoDb Aggregation Pipeline: For the "Month-Wise" revenue calculation. I used Aggregations Pipeline($group,$sum,$match) to let the database do the heavy lifting. This reduced the data processing time.
* Smart Image Compression: I used Cloudinary's Auto Format feature. it automatically shrinks the image size without losing the quality before showing it. This makes the property pages load almost instantly.
* Serverless Cold-Start Fix: On the platform like Vercel, the database can sometimes disconnects during inactivity. I implemneted a Global Connection Middleware that ensures the database is always "Warm" before any request is processed.
* JWT Authentication: All sensitive actions like (booking or managing a listing) are protected by JSON Web Tokens.
* Bcrypt Hashing: I have used bcrypt to hash user password, ensuring that sensitive credentials are never stored in plain text.
* lean() Queries: For all "Read-only" operations, I used .lean() making the data fetching 20% faster. 

## 🛠️Tech Stack Used 
```
ReactJs | NodeJs | ExpressJs | MongoDB | Groq(LLM) 
```

## ⚙️Installation & Setup
1. Clone the repo:
```
git clone https://github.com/Tanishk-0x/Atithi.git
```

2. Navigate to /Backend:
```
cd Backend
```

3. Install Backend Dependencies:
```
npm install 
```

4. Navigate to /Frontend & Install Dependencies:
```
cd Frontend && npm install
```

5. Set Environment Variables (.env):
```
PORT = 
MONGO_URL = ""
JWT_SECRET = ""
GROQ_API_KEY = ""
CLOUDINARY_CLOUD_NAME = ""
CLOUDINARY_API_KEY = ""
CLOUDINARY_API_SECRET = ""
HOST_EMAIL = ""
EMAIL_APP_PASSWORD = ""
```

6. Start the Server:
```
npm start
```

7. Run the Project:
```
npm run dev
```
