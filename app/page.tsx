import styles from './page.module.css';

type Project = {
	number: string;
	title: string;
	description: string;
	href: string;
	icon: string;
};

const projects: Project[] = [
	{ number: '01', title: 'Simply Code Website', description: 'A clear home for Simply Code’s mission, programs, and impact in computer science education.', href: 'https://wesimplycode.org', icon: 'fas fa-globe' },
	{ number: '02', title: 'Schedule Master', description: 'A minimal schedule tool, app, and extension that helps LWHS students navigate their day.', href: 'https://schedule.lwhsftc.org', icon: 'fas fa-calendar-alt' },
	{ number: '03', title: 'AP Credit Converter', description: 'A planning tool that converts AP scores into college credits across different universities.', href: 'https://ap.rudrapandit.com', icon: 'fas fa-graduation-cap' },
	{ number: '04', title: 'Future Tech Club Website', description: 'A club website designed to foster innovation and technology education.', href: 'https://lwhsftc.org', icon: 'fas fa-rocket' },
	{ number: '05', title: 'GPA Calculator', description: 'A simple GPA calculator with course weighting and grade prediction features.', href: 'https://coolgpacalculator.vercel.app', icon: 'fas fa-calculator' },
	{ number: '06', title: 'WPM Speed Test', description: 'A clean typing test for measuring and improving speed over time.', href: 'https://wpmspeedtest.vercel.app', icon: 'fas fa-keyboard' },
];

const skills = ['JavaScript', 'Python', 'Java', 'React', 'Next.js', 'Node.js', 'MongoDB', 'Git'];

function Icon({ name }: { name: string }) {
	return <i className={name} aria-hidden="true" />;
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
	return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function HomePage() {
	return (
		<main className={styles.page}>
			<nav className={styles.nav}>
				<a className={styles.logo} href="#top" aria-label="Back to top">RP<span>.</span></a>
				<div className={styles.navLinks}>
					<a href="#projects">Projects</a>
					<a href="#skills">Skills</a>
					<a href="#contact">Contact</a>
				</div>
			</nav>

			<div className={styles.shell} id="top">
				<section className={styles.hero}>
					<div>
						<h1>Rudra <span>Pandit</span></h1>
						<p className={styles.education}>Computer Engineering <b>·</b> University of California, Irvine</p>
						<p className={styles.intro}>Incoming CpE student at UC Irvine. Interested in electronics, software, and programming! You can learn more about my projects below, and find my contact information.</p>
						<div className={styles.actions}>
							<a className={styles.primaryButton} href="#projects">View projects <Icon name="fas fa-arrow-down" /></a>
							<ExternalLink href="https://github.com/realrudy/"><span className={styles.textLink}>GitHub <Icon name="fas fa-arrow-up-right-from-square" /></span></ExternalLink>
						</div>
					</div>
				</section>

				<section className={styles.section} id="projects">
					<div className={styles.sectionHeading}><p className={styles.sectionKicker}>Selected work</p><p className={styles.sectionCount}>06 projects</p></div>
					<div className={styles.projectList}>
						{projects.map((project) => (
							<article className={styles.projectRow} key={project.title}>
								<div className={styles.imagePlaceholder}><Icon name={project.icon} /><span>{project.number}</span></div>
								<div className={styles.projectInfo}><h2>{project.title}</h2><p>{project.description}</p></div>
								<ExternalLink href={project.href}><span className={styles.projectLink}>Visit <Icon name="fas fa-arrow-up-right-from-square" /></span></ExternalLink>
							</article>
						))}
					</div>
				</section>

				<section className={`${styles.section} ${styles.skillsSection}`} id="skills">
					<div className={styles.sectionHeading}><p className={styles.sectionKicker}>Toolkit</p><p className={styles.sectionCount}>What I use</p></div>
					<div className={styles.skillList}>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
				</section>

				<section className={styles.contact} id="contact">
					<p className={styles.sectionKicker}>Contact me</p>
					<h2>Need to<br /><span>reach out?</span></h2>
					<a className={styles.email} href="mailto:contact@rudrapandit.com">contact@rudrapandit.com <Icon name="fas fa-arrow-up-right-from-square" /></a>
				</section>

				<footer className={styles.footer}><span>Rudra Pandit</span><span>Built with curiosity · {new Date().getFullYear()}</span></footer>
			</div>
		</main>
	);
}
