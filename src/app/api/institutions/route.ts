import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface Institution {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  website?: string;
  established?: string;
  ranking?: string;
  programs?: string[];
  image?: string;
}

export async function GET() {
  try {
    const url = 'https://collegeadmissionnp.com/top-universities-and-colleges-in-india.html';
    
    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    const institutions: Institution[] = [];
    let idCounter = 1;

    // Extract institutions from the webpage
    // This is a generic approach - you may need to adjust selectors based on the actual HTML structure
    $('h1, h2, h3, h4, h5, h6').each((index, element) => {
      const text = $(element).text().trim();
      
      // Look for institution names (this is a heuristic approach)
      if (text.length > 10 && text.length < 100 && 
          (text.includes('Institute') || text.includes('University') || 
           text.includes('College') || text.includes('IIT') || 
           text.includes('IIM') || text.includes('AIIMS'))) {
        
        // Try to extract additional information from surrounding elements
        const parent = $(element).parent();
        const description = parent.find('p').first().text().trim() || 
                          parent.next('p').text().trim() || 
                          'Premier educational institution in India.';
        
        // Determine type based on name
        let type = 'University';
        if (text.includes('IIT') || text.includes('Engineering')) type = 'Engineering';
        else if (text.includes('IIM') || text.includes('Management')) type = 'Management';
        else if (text.includes('AIIMS') || text.includes('Medical')) type = 'Medical';
        else if (text.includes('Research') || text.includes('IISc')) type = 'Research';
        
        // Extract location (this is a simplified approach)
        let location = 'India';
        if (text.includes('Delhi')) location = 'New Delhi';
        else if (text.includes('Mumbai')) location = 'Mumbai';
        else if (text.includes('Bangalore')) location = 'Bangalore';
        else if (text.includes('Chennai')) location = 'Chennai';
        else if (text.includes('Kolkata')) location = 'Kolkata';
        else if (text.includes('Pune')) location = 'Pune';
        else if (text.includes('Hyderabad')) location = 'Hyderabad';
        
        institutions.push({
          id: idCounter.toString(),
          name: text,
          location: location,
          type: type,
          description: description,
          ranking: idCounter.toString(),
          programs: getDefaultPrograms(type)
        });
        
        idCounter++;
      }
    });

    // If no institutions were found with the above method, return mock data
    if (institutions.length === 0) {
      return NextResponse.json(getMockInstitutions());
    }

    return NextResponse.json(institutions);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    // Return mock data as fallback
    return NextResponse.json(getMockInstitutions());
  }
}

function getDefaultPrograms(type: string): string[] {
  switch (type) {
    case 'Engineering':
      return ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];
    case 'Management':
      return ['MBA', 'PGP', 'Executive MBA', 'PhD'];
    case 'Medical':
      return ['MBBS', 'MD', 'MS', 'PhD'];
    case 'Research':
      return ['PhD', 'MSc', 'MTech', 'Research Programs'];
    default:
      return ['Undergraduate', 'Postgraduate', 'PhD', 'Research'];
  }
}

function getMockInstitutions(): Institution[] {
  return [
    {
      id: '1',
      name: 'Indian Institute of Technology (IIT) Delhi',
      location: 'New Delhi',
      type: 'Engineering',
      description: 'Premier engineering institute known for excellence in technology and research.',
      website: 'https://www.iitd.ac.in',
      established: '1961',
      ranking: '1',
      programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'],
      image: '/assets/iit-delhi.jpg'
    },
    {
      id: '2',
      name: 'Indian Institute of Technology (IIT) Bombay',
      location: 'Mumbai',
      type: 'Engineering',
      description: 'One of the most prestigious engineering institutes in India.',
      website: 'https://www.iitb.ac.in',
      established: '1958',
      ranking: '2',
      programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Chemical Engineering'],
      image: '/assets/iit-bombay.jpg'
    },
    {
      id: '3',
      name: 'Indian Institute of Technology (IIT) Madras',
      location: 'Chennai',
      type: 'Engineering',
      description: 'Leading engineering institute in South India.',
      website: 'https://www.iitm.ac.in',
      established: '1959',
      ranking: '3',
      programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Aerospace Engineering'],
      image: '/assets/iit-madras.jpg'
    },
    {
      id: '4',
      name: 'Indian Institute of Management (IIM) Ahmedabad',
      location: 'Ahmedabad',
      type: 'Management',
      description: 'Premier business school in India.',
      website: 'https://www.iima.ac.in',
      established: '1961',
      ranking: '1',
      programs: ['MBA', 'PGP', 'Executive MBA', 'PhD'],
      image: '/assets/iim-ahmedabad.jpg'
    },
    {
      id: '5',
      name: 'Indian Institute of Management (IIM) Bangalore',
      location: 'Bangalore',
      type: 'Management',
      description: 'Top-ranked business school in India.',
      website: 'https://www.iimb.ac.in',
      established: '1973',
      ranking: '2',
      programs: ['MBA', 'PGP', 'Executive MBA', 'PhD'],
      image: '/assets/iim-bangalore.jpg'
    },
    {
      id: '6',
      name: 'All India Institute of Medical Sciences (AIIMS) Delhi',
      location: 'New Delhi',
      type: 'Medical',
      description: 'Premier medical institute in India.',
      website: 'https://www.aiims.edu',
      established: '1956',
      ranking: '1',
      programs: ['MBBS', 'MD', 'MS', 'PhD'],
      image: '/assets/aiims-delhi.jpg'
    },
    {
      id: '7',
      name: 'Jawaharlal Nehru University (JNU)',
      location: 'New Delhi',
      type: 'University',
      description: 'Premier public research university in India.',
      website: 'https://www.jnu.ac.in',
      established: '1969',
      ranking: '1',
      programs: ['Arts', 'Sciences', 'Social Sciences', 'Languages'],
      image: '/assets/jnu.jpg'
    },
    {
      id: '8',
      name: 'University of Delhi',
      location: 'New Delhi',
      type: 'University',
      description: 'One of the largest and most prestigious universities in India.',
      website: 'https://www.du.ac.in',
      established: '1922',
      ranking: '2',
      programs: ['Arts', 'Sciences', 'Commerce', 'Engineering'],
      image: '/assets/du.jpg'
    },
    {
      id: '9',
      name: 'Indian Institute of Science (IISc) Bangalore',
      location: 'Bangalore',
      type: 'Research',
      description: 'Premier research institute in India.',
      website: 'https://www.iisc.ac.in',
      established: '1909',
      ranking: '1',
      programs: ['Engineering', 'Sciences', 'Management', 'PhD'],
      image: '/assets/iisc.jpg'
    },
    {
      id: '10',
      name: 'Tata Institute of Fundamental Research (TIFR)',
      location: 'Mumbai',
      type: 'Research',
      description: 'Premier research institute for fundamental sciences.',
      website: 'https://www.tifr.res.in',
      established: '1945',
      ranking: '1',
      programs: ['Physics', 'Mathematics', 'Computer Science', 'Biology'],
      image: '/assets/tifr.jpg'
    },
    {
      id: '11',
      name: 'Indian Institute of Technology (IIT) Kanpur',
      location: 'Kanpur',
      type: 'Engineering',
      description: 'Premier engineering institute in North India.',
      website: 'https://www.iitk.ac.in',
      established: '1959',
      ranking: '4',
      programs: ['Computer Science', 'Mechanical Engineering', 'Aerospace Engineering', 'Chemical Engineering'],
      image: '/assets/iit-kanpur.jpg'
    },
    {
      id: '12',
      name: 'Indian Institute of Technology (IIT) Kharagpur',
      location: 'Kharagpur',
      type: 'Engineering',
      description: 'First and oldest IIT in India.',
      website: 'https://www.iitkgp.ac.in',
      established: '1951',
      ranking: '5',
      programs: ['Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Mining Engineering'],
      image: '/assets/iit-kharagpur.jpg'
    },
    {
      id: '13',
      name: 'Indian Institute of Management (IIM) Calcutta',
      location: 'Kolkata',
      type: 'Management',
      description: 'First IIM established in India.',
      website: 'https://www.iimcal.ac.in',
      established: '1961',
      ranking: '3',
      programs: ['MBA', 'PGP', 'Executive MBA', 'PhD'],
      image: '/assets/iim-calcutta.jpg'
    },
    {
      id: '14',
      name: 'Indian Institute of Management (IIM) Lucknow',
      location: 'Lucknow',
      type: 'Management',
      description: 'Premier business school in North India.',
      website: 'https://www.iiml.ac.in',
      established: '1984',
      ranking: '4',
      programs: ['MBA', 'PGP', 'Executive MBA', 'PhD'],
      image: '/assets/iim-lucknow.jpg'
    },
    {
      id: '15',
      name: 'Banaras Hindu University (BHU)',
      location: 'Varanasi',
      type: 'University',
      description: 'Premier central university in India.',
      website: 'https://www.bhu.ac.in',
      established: '1916',
      ranking: '3',
      programs: ['Arts', 'Sciences', 'Engineering', 'Medical'],
      image: '/assets/bhu.jpg'
    }
  ];
}

