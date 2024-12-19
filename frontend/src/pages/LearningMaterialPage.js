// src/pages/LearningMaterialPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../services/courseService';
import LearningMaterialCard from '../components/LearningMaterialCard';

const LearningMaterialPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const fetchedCourse = await getCourseById(courseId);
        setCourse(fetchedCourse);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{course.name}</h1>
      <p>{course.description}</p>

      <h2>Learning Materials</h2>
      {course.materials && course.materials.length > 0 ? (
        course.materials.map((material, index) => (
          <LearningMaterialCard key={index} material={material} />
        ))
      ) : (
        <p>No materials available for this course.</p>
      )}
    </div>
  );
};

export default LearningMaterialPage;
