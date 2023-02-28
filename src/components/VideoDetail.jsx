import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Video, Loader } from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

function VideoDetail() {
  const { id } = useParams();
  const [videoDetail, setvideoDetail] = useState(null);
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistic&id=${id}`)
      .then((data) => setvideoDetail(data.items[0]));
  }, [id]);
  console.log(videoDetail);
  if (!videoDetail?.snippet) return <Loader />;
  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;


  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
            <Typography color='#fff' variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} px={1} py={2}>
              <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" >
                {channelTitle}
                <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
              </Typography>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>

          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
export default VideoDetail;