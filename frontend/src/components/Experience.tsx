import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTourById, getRating } from '../api-client';

export type CommentFormData = {
    tourId: string;
    comment: string;
};

const CommentForm: React.FC = () => {
    const { tourId } = useParams<{ tourId: string }>();
    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<{ comment: string; rating: number }[]>([]);

    useEffect(() => {
        // Fetch comments when the component mounts
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            // Call the API to fetch tour details
            const tour = await fetchTourById(tourId);
            // Extract comments and ratings from the tour object
            const { ratings } = tour;
            // Set the comments state
            setComments(ratings);
        } catch (error) {
            console.error('Error fetching tour details:', error.message);
            // Handle error appropriately
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const formData: CommentFormData = { tourId, comment };
            // Call the API to submit the comment
            await getRating(formData);
            // Fetch updated comments after submitting a new comment
            fetchComments();
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error.message);
            // Handle errors here
        }
    };

    return (
        <div className="mt-4">
            <textarea
                value={comment}
                onChange={handleChange}
                placeholder="Write your comment..."
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
            />
            <button
                onClick={handleSubmit}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Submit Comment
            </button>
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                {comments.map((commentData, index) => (
                    <div key={index} className="border border-gray-200 p-3 mb-2 rounded-md">
                        <p className="text-lg font-medium">{commentData.comment}</p>
                        <p className="text-sm">Rating: {commentData.rating}</p>
                    </div>
                )).reverse()} {/* Reverse the order of mapping */}
                </div>
        </div>
    );
};

export default CommentForm;
