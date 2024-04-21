// Client-side function to send data to server
async function sendMarksToLeaderboard(userId: string, courseId: string, chapterId: string, marks: number) {
    const data = {userId, courseId, chapterId, marks};
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add marks');
      }
      const responseData = await response.json();
      console.log(responseData);
      // Handle success response from server
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }
  
 
export { sendMarksToLeaderboard };