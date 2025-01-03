import React, { useEffect, useState } from 'react'
import CreateAndEditProjectForm from '../createAndEditProjectForm'
import { useDispatch } from 'react-redux';
import { fetchProjectById } from '../../../redux/thunks/projectThunk';
import { useParams } from 'react-router-dom';

const ProjectEditView = () => {
    const { projectId } = useParams(); // Get projectId from URL
    const [project, setProject] = useState(null); // Local state to store the project
    console.log("🚀 ~ ProjectEditView ~ project:", project)
    const [loading, setLoading] = useState(false); // To show loading state
    const [error, setError] = useState(null); // To handle errors
  
    const dispatch = useDispatch();
    const {id} = useParams()

    useEffect(() => {
        if (id) {
            
            const getProject = async () => {
              try {
                setLoading(true);
                const projectData = await dispatch(fetchProjectById(id)).unwrap(); // Fetch project data
                setProject(projectData); // Set the project in local state
              } catch (err) {
                setError('Error fetching project.');
              } finally {
                setLoading(false);
              }
            };
            getProject()
        }
    
      }, [id, dispatch]);
    
    
  return (
    <div><CreateAndEditProjectForm currunt={project}/></div>
  )
}

export default ProjectEditView