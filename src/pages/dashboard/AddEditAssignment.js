import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import AssignmentForm from "../../components/forms/dashboard/AssignmentForm";
import {
  useGetAssignmentsQuery,
  useGetSingleAssignmentQuery,
} from "../../features/assignments/assignmentsApi";
import { useGetVideosQuery } from "../../features/videos/videoApi";
import { videosWithNoAssignment } from "../../utils/videoFilter";

export default function AddEditAssignment() {
  // Local States
  const [skip, setSkip] = useState(true);

  // Dependencies
  const { assId } = useParams();
  const { data: assignment } = useGetSingleAssignmentQuery(assId, {
    skip,
  });

  //Fetch all assignments for database
  const { data: assignments } = useGetAssignmentsQuery();

  //Fetch all videos for database
  const { data: videos } = useGetVideosQuery();

  // Side Effects
  useEffect(() => {
    if (assId) {
      setSkip(false);
    }
  }, [assId]);

  return (
    <>
      <Helmet>
        <title>Manage Assignment</title>
      </Helmet>
      <div className="flex-d-column">
        <h2 className="mt-2 mb-8 text-center text-3xl font-extrabold text-slate-100">
          {assId ? "Edit Assignment" : "Add Assignment"}
        </h2>
        <AssignmentForm
          formData={assignment || {}}
          videos={videosWithNoAssignment(videos, assignments, assignment)}
        />
      </div>
    </>
  );
}
