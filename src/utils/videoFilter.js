export const videosWithNoAssignment = (
  videos = [],
  assignments = [],
  assignment = {}
) => {
  let assignmentsVideo = [];

  // Find video with with given assignment
  if (assignment.id) {
    assignmentsVideo = videos.find(
      (video) => +video.id === +assignment.video_id
    );
  }

  // Filter videos that have no assignment
  let filteredVideos = videos.filter((video) => {
    return (
      assignments.findIndex(
        (ass) => +ass.video_id === +video.id || +ass.video_id === +assignment.id
      ) < 0
    );
  });

  return [...filteredVideos, assignmentsVideo];
};
