import { db } from './firebase'; // Firebase instance
import { collection, addDoc, getDocs, getDoc, updateDoc, doc, setDoc,deleteDoc } from 'firebase/firestore';

// Create a new course
export const createCourse = async (courseData) => {
  try {
    const coursesCollectionRef = collection(db, 'courses');
    const newCourse = await addDoc(coursesCollectionRef, {
      name: courseData.name,
      description: courseData.description,
      lessons: courseData.lessons, // lessons now include quiz and assignment fields
      category: courseData.category,
      tags: courseData.tags,
      createdAt: new Date(),
    });
    console.log("Course created with ID: ", newCourse.id);
    return newCourse.id;
  } catch (error) {
    console.error("Error adding course: ", error);
    throw error;
  }
};

// Fetch all courses from Firestore
export const getCourses = async () => {
  try {
    const coursesCollectionRef = collection(db, 'courses');
    const querySnapshot = await getDocs(coursesCollectionRef);
    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return courses;
  } catch (error) {
    console.error('Error fetching courses: ', error);
    return [];
  }
};

// Fetch a specific course by its ID
export const getCourseById = async (courseId) => {
  try {
    const courseDocRef = doc(db, 'courses', courseId);
    const courseDoc = await getDoc(courseDocRef);
    if (courseDoc.exists()) {
      return { id: courseDoc.id, ...courseDoc.data() };
    } else {
      console.log('No such course!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching course: ', error);
    throw error;
  }
};

// Update user progress for a lesson, quiz, or assignment
export const updateLessonProgress = async (userId, courseId, lessonId, type, completed) => {
  try {
    const userProgressRef = doc(db, 'userProgress', userId); // Assuming a 'userProgress' collection
    const userProgressDoc = await getDoc(userProgressRef);

    if (userProgressDoc.exists()) {
      // If user progress exists, update the specific lesson's quiz/assignment
      const progressData = userProgressDoc.data();
      const updatedCourses = progressData.courses || {};
      const courseProgress = updatedCourses[courseId] || { lessons: {} };

      // Update the specific progress field (quiz or assignment) for the lesson
      const updatedLesson = {
        ...courseProgress.lessons[lessonId],
        [type]: { completed }, // Update quiz or assignment progress
      };

      // Save the updated progress
      await updateDoc(userProgressRef, {
        courses: {
          ...updatedCourses,
          [courseId]: {
            ...courseProgress,
            lessons: {
              ...courseProgress.lessons,
              [lessonId]: updatedLesson,
            },
          },
        },
      });
    } else {
      // If no progress exists, create a new progress document
      await setDoc(userProgressRef, {
        courses: {
          [courseId]: {
            lessons: {
              [lessonId]: {
                [type]: { completed }, // Initialize the progress with the type
              },
            },
          },
        },
      });
    }

    console.log(`Lesson ${lessonId} ${type} marked as ${completed ? 'completed' : 'incomplete'}`);
  } catch (error) {
    console.error('Error updating progress: ', error);
    throw error;
  }
};

// Fetch user progress for a specific course (including quiz/assignment progress)
export const getUserProgress = async (userId, courseId) => {
  try {
    const userProgressRef = doc(db, 'userProgress', userId);
    const userProgressDoc = await getDoc(userProgressRef);

    if (userProgressDoc.exists()) {
      const progressData = userProgressDoc.data();
      return progressData.courses?.[courseId]?.lessons || {};
    }
    // Return an empty object if no progress exists
    return {};
  } catch (error) {
    console.error('Error fetching user progress: ', error);
    throw error;
  }
};
// Delete a course by ID
export const deleteCourse = async (courseId) => {
  try {
    const courseDocRef = doc(db, "courses", courseId);
    await deleteDoc(courseDocRef);
    console.log("Course deleted successfully!");
  } catch (error) {
    console.error("Error deleting course: ", error);
    throw error;
  }
};
