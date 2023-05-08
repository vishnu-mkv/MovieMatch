﻿namespace MovieMatch.Dtos
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }

        public UserSummaryDto User { get; set; }
    }
}
