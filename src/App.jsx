import { useState } from 'react';

import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import SelectedProject from './components/SelectedProject';

const App = () => {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
	});

	const handleProjectCreation = () => {
		setProjectsState((prevState) => ({
			...prevState,
			selectedProjectId: null,
		}));
	};

	const handleAddProject = (projectData) => {
		setProjectsState((prevState) => {
			const newProject = {
				...projectData,
				id: Math.random(),
			};

			return {
				...prevState,
				selectedProjectId: undefined,
				projects: [...prevState.projects, newProject],
			};
		});
	};

	const handleAddTask = (text) => {
		setProjectsState((prevState) => {
			const newTask = {
				text,
				projectId: prevState.selectedProjectId,
				id: Math.random(),
			};

			return {
				...prevState,
				tasks: [...prevState.tasks, newTask],
			};
		});
	};

	const handleTaskDeletion = (id) => {
		setProjectsState((prevState) => ({
			...prevState,
			tasks: prevState.tasks.filter((task) => task.id !== id),
		}));
	};

	const handleCancelProjectCreation = () => {
		setProjectsState((prevState) => ({
			...prevState,
			selectedProjectId: undefined,
		}));
	};

	const handleProjectSelection = (id) => {
		setProjectsState((prevState) => ({
			...prevState,
			selectedProjectId: id,
		}));
	};

	const handleProjectDeletion = () => {
		setProjectsState((prevState) => ({
			...prevState,
			selectedProjectId: undefined,
			projects: prevState.projects.filter(
				(project) => project.id !== prevState.selectedProjectId
			),
		}));
	};

	const selectedProject = projectsState.projects.find(
		(project) => project.id === projectsState.selectedProjectId
	);

	return (
		<main className="h-screen flex gap-8">
			<ProjectsSidebar
				onCreation={handleProjectCreation}
				projects={projectsState.projects}
				onSelect={handleProjectSelection}
				selectedProjectId={projectsState.selectedProjectId}
			/>
			{projectsState.selectedProjectId === null ? (
				<NewProject
					onAdd={handleAddProject}
					onCancel={handleCancelProjectCreation}
				/>
			) : projectsState.selectedProjectId === undefined ? (
				<NoProjectSelected onCreation={handleProjectCreation} />
			) : (
				<SelectedProject
					project={selectedProject}
					onDelete={handleProjectDeletion}
					onAddTask={handleAddTask}
					onDeleteTask={handleTaskDeletion}
					tasks={projectsState.tasks}
				/>
			)}
		</main>
	);
};

export default App;
