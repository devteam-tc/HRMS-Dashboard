import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Clock,
  Edit,
  Eye,
  Share2
} from 'lucide-react';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary: string;
  status: 'active' | 'draft' | 'closed' | 'on-hold';
  posted: string;
  applications: number;
  description: string;
  requirements: string[];
}

const jobOpenings: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'full-time',
    experience: '5-7 years',
    salary: '$120K - $150K',
    status: 'active',
    posted: '2024-01-10',
    applications: 23,
    description: 'We are looking for a Senior Frontend Developer to join our engineering team...',
    requirements: ['React.js', 'TypeScript', 'Node.js', 'GraphQL']
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'full-time',
    experience: '3-5 years',
    salary: '$110K - $140K',
    status: 'active',
    posted: '2024-01-08',
    applications: 31,
    description: 'Join our product team to help define and execute product strategy...',
    requirements: ['Product Strategy', 'Agile', 'Data Analysis', 'Leadership']
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'full-time',
    experience: '2-4 years',
    salary: '$85K - $110K',
    status: 'active',
    posted: '2024-01-12',
    applications: 18,
    description: 'Create intuitive and engaging user experiences for our digital products...',
    requirements: ['Figma', 'Sketch', 'Prototyping', 'User Research']
  },
  {
    id: '4',
    title: 'Marketing Intern',
    department: 'Marketing',
    location: 'Austin, TX',
    type: 'internship',
    experience: '0-1 years',
    salary: '$20 - $25/hour',
    status: 'draft',
    posted: '2024-01-15',
    applications: 0,
    description: 'Learn and contribute to our marketing campaigns and strategies...',
    requirements: ['Marketing Fundamentals', 'Social Media', 'Content Creation']
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Seattle, WA',
    type: 'contract',
    experience: '4-6 years',
    salary: '$130K - $160K',
    status: 'on-hold',
    posted: '2024-01-05',
    applications: 12,
    description: 'Help us scale our infrastructure and improve our deployment processes...',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
  }
];

export const JobOpenings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-purple-100 text-purple-800';
      case 'contract':
        return 'bg-orange-100 text-orange-800';
      case 'internship':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const departments = [...new Set(jobOpenings.map(job => job.department))];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Job Openings</h1>
          <p className="text-gray-600 mt-1">Manage and track job postings</p>
        </div>
        <Button className="bg-[#05A7CC] hover:bg-[#048ba8] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search job titles, departments, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-[#05A7CC]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobOpenings.length}</div>
            <p className="text-xs text-gray-500">All positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {jobOpenings.filter(job => job.status === 'active').length}
            </div>
            <p className="text-xs text-gray-500">Currently hiring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-[#EF5226]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#EF5226]">
              {jobOpenings.reduce((total, job) => total + job.applications, 0)}
            </div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Applications</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(jobOpenings.reduce((total, job) => total + job.applications, 0) / jobOpenings.length)}
            </div>
            <p className="text-xs text-gray-500">Per job</p>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.replace('-', ' ')}
                    </Badge>
                    <Badge className={getTypeColor(job.type)}>
                      {job.type.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{job.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{job.experience}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    {new Date(job.posted).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Salary: {job.salary}</p>
                <p className="line-clamp-2">{job.description}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {req}
                  </Badge>
                ))}
                {job.requirements.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{job.requirements.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {job.applications} applications
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-[#05A7CC] hover:bg-[#048ba8] text-white">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search filters or create a new job posting.</p>
            <Button className="mt-4 bg-[#05A7CC] hover:bg-[#048ba8] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};