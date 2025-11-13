// Main application scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any global functionality here
    
    // Example: Language selector functionality
    const languageSelectors = document.querySelectorAll('.language-selector');
    if (languageSelectors) {
        languageSelectors.forEach(selector => {
            selector.addEventListener('change', function(e) {
                console.log('Language changed to:', e.target.value);
                // In a real app, this would change the UI language
            });
        });
    }
    
    // Example: Accessibility features toggle
    const accessibilityToggles = document.querySelectorAll('.accessibility-toggle');
    accessibilityToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const feature = this.dataset.feature;
            console.log('Toggling accessibility feature:', feature);
            // Implement actual accessibility feature toggles here
        });
    });
    
    // Offline status detection
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    function updateOnlineStatus() {
        const statusDisplay = document.getElementById('connection-status');
        if (statusDisplay) {
            if (navigator.onLine) {
                statusDisplay.textContent = 'Online';
                statusDisplay.className = 'text-green-500';
            } else {
                statusDisplay.textContent = 'Offline - using cached content';
                statusDisplay.className = 'text-yellow-500';
            }
        }
    }
    
    // Initialize offline status
    updateOnlineStatus();
    
    // Also watch for late-inserted badges/scripts for a short window after load
    try {
        const textRegex = /made with\s*deepsite|deepsite|huggingface/i;
        const selectors = ['script[src*="deepsite"]', 'script[src*="huggingface"]', 'iframe[src*="deepsite"]', 'iframe[src*="huggingface"]'];

        const observer = new MutationObserver(mutations => {
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (!node) continue;
                    // element nodes
                    if (node.nodeType === 1) {
                        const el = node;
                        try {
                            // remove if matches known selectors
                            for (const sel of selectors) {
                                if (el.matches && el.matches(sel)) {
                                    el.remove();
                                    continue;
                                }
                            }
                            // remove if text content matches
                            if (!el.children.length && el.textContent && textRegex.test(el.textContent.trim())) {
                                el.remove();
                                continue;
                            }
                            // also check descendants quickly
                            const found = el.querySelector && (el.querySelector('script[src*="deepsite"], script[src*="huggingface"], iframe[src*="deepsite"], iframe[src*="huggingface"]') || el.querySelector('*')).matches;
                        } catch (inner) {
                            // ignore match errors
                        }
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Stop observing after 5 seconds
        setTimeout(() => observer.disconnect(), 5000);
    } catch (e) {
        console.warn('DeepSite mutation observer failed', e);
    }
});
// Roadmap Generator Functionality
document.getElementById('roadmap-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const generateBtn = form.querySelector('button[type="submit"]');
    const generateText = document.getElementById('generate-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const roadmapResult = document.getElementById('roadmap-result');
    const roadmapContent = document.getElementById('roadmap-content');
    
    // Show loading state
    generateText.textContent = 'Generating...';
    loadingSpinner.classList.remove('hidden');
    generateBtn.disabled = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Get form values
        const educationLevel = document.getElementById('education-level').value;
        const subject = document.getElementById('subject').value;
        const timeframe = document.getElementById('timeframe').value;
        
        // Generate sample roadmap (in real app, this would come from API)
        const roadmap = generateSampleRoadmap(educationLevel, subject, timeframe);
        
        // Display result
        roadmapContent.innerHTML = roadmap;
        roadmapResult.classList.remove('hidden');
        
        // Reset button state
        generateText.textContent = 'Generate Roadmap';
        loadingSpinner.classList.add('hidden');
        generateBtn.disabled = false;
        
        // Scroll to result
        roadmapResult.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

function generateSampleRoadmap(level, subject, hours) {
    const weeks = Math.min(Math.max(Math.ceil(100 / hours), 4), 12);
    const topics = [
        "Fundamentals and Basics",
        "Core Concepts and Principles",
        "Practical Applications",
        "Advanced Techniques",
        "Case Studies and Real-world Examples",
        "Revision and Practice"
    ];
    
    let roadmapHTML = `
        <h4>${subject} Study Roadmap (${level} level)</h4>
        <p>Based on your available ${hours} hours per week, we've created a ${weeks}-week study plan:</p>
        <ul>
    `;
    
    topics.forEach((topic, index) => {
        const weekStart = Math.floor((index * weeks) / topics.length) + 1;
        const weekEnd = Math.floor(((index + 1) * weeks) / topics.length);
        const weekRange = weekStart === weekEnd ? `Week ${weekStart}` : `Weeks ${weekStart}-${weekEnd}`;
        
        roadmapHTML += `
            <li class="mb-2">
                <strong>${weekRange}:</strong> ${topic}
                <ul class="ml-4 text-sm text-gray-600">
                    <li>Key learning objectives</li>
                    <li>Recommended resources</li>
                    <li>Practice exercises</li>
                </ul>
            </li>
        `;
    });
    
    roadmapHTML += `
        </ul>
        <div class="bg-blue-50 p-4 rounded-lg mt-4">
            <h5 class="font-bold mb-2">AI Study Tips</h5>
            <p>Based on your subject, our AI recommends:</p>
            <ul class="list-disc ml-5">
                <li>Focus on practical applications in weeks 3-4</li>
                <li>Allocate 20% more time to core concepts</li>
                <li>Use spaced repetition for better retention</li>
            </ul>
        </div>
    `;
    
    return roadmapHTML;
}

// Save roadmap functionality
document.getElementById('save-roadmap').addEventListener('click', function() {
    // In a real app, this would save to user's account
    alert('Roadmap saved to your account! You can access it anytime from your dashboard.');
});