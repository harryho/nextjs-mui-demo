'use client'
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material//Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import * as service from "@/app/services/blogServices";


import { PostItem } from './PostItem';
import { PostSort } from './PostSort';
import { PostSearch } from './PostSearch';
import { AddAPhoto } from '@mui/icons-material';

// ----------------------------------------------------------------------

export function BlogGridView() {
  const [sortBy, setSortBy] = useState('latest');

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);
  const posts = service.getAllItems();

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Blogs
        </Typography>
        <Button
          variant="contained"
           color="primary"

          startIcon={<AddAPhoto  />}

        >
          New post
        </Button>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <PostSearch posts={posts} />
        <PostSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Box>

      <Grid container spacing={3}>
        {posts.map((post, index) => {
          const latestPostLarge = index === 0;
          const latestPost = index === 1 || index === 2;

          return (
            <Grid key={post.id} size={{ xs: 12, sm: (latestPostLarge ? 12 : 6), md: (latestPostLarge ? 6 : 3) }}>
              <PostItem post={post} latestPost={latestPost} latestPostLarge={latestPostLarge} />
            </Grid>
          );
        })}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </>
  );
}
