from resume_parser.models import JobPosting, Resume
from .skill_match import calculate_skill_match_percentage

def suggest_candidates_for_job(job_posting_id, match_threshold=50):
    job_posting = JobPosting.objects.get(id=job_posting_id)
    all_resumes = Resume.objects.all()

    suitable_candidates = []
    for resume in all_resumes:
        match_percentage = calculate_skill_match_percentage(job_posting.id, resume.id)
        if match_percentage >= match_threshold:
            suitable_candidates.append((resume, match_percentage))

    # Sort candidates by match percentage in descending order
    suitable_candidates.sort(key=lambda x: x[1], reverse=True)
    return suitable_candidates