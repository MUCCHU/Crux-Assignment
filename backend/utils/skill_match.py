from resume_parser.models import JobPosting, Resume


def calculate_skill_match_percentage(job_posting_id, resume_id):
    job_posting = JobPosting.objects.get(id=job_posting_id)
    resume = Resume.objects.get(id=resume_id)

    job_skills = set(job_posting.required_skills.all())
    candidate_skills = set(resume.skills.all())

    if not job_skills:
        return 0  # Avoid division by zero

    skill_overlap = job_skills.intersection(candidate_skills)
    match_percentage = (len(skill_overlap) / len(job_skills)) * 100
    return match_percentage
