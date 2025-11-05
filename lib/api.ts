const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    name: string;
    email: string;
    password: string;
    referral_code?: string;
  }) {
    const response = await this.request<{
      user: any;
      token: string;
    }>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{
      user: any;
      token: string;
    }>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout() {
    const response = await this.request('/logout', {
      method: 'POST',
    });
    this.clearToken();
    return response;
  }

  async getProfile() {
    return this.request('/me');
  }

  // Companions endpoints
  async getCompanions(params?: { online_only?: boolean; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.online_only) queryParams.append('online_only', 'true');
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    return this.request(`/companions${query ? `?${query}` : ''}`);
  }

  async getCompanion(id: number) {
    return this.request(`/companions/${id}`);
  }

  // Custom AI endpoints
  async getCustomAis() {
    return this.request('/custom-ais');
  }

  async createCustomAi(aiData: {
    name: string;
    gender: 'male' | 'female';
    style: 'realistic' | 'anime';
    ethnicity: string;
    age_range: string;
    hairstyle: string;
    hair_length: string;
    hair_color: string;
    eye_color: string;
    body_type: string;
    breast_size: string;
    ass_size: string;
    accent?: string;
    personality_prompt?: string;
    hobbies?: string[];
    career?: string;
    personality_traits?: string[];
    relationship?: string;
    family_background?: string;
    financial_status?: string;
    texting_style?: string;
    fetishes?: string[];
    initial_message?: string;
  }) {
    return this.request('/custom-ais', {
      method: 'POST',
      body: JSON.stringify(aiData),
    });
  }

  async getCustomAi(id: number) {
    return this.request(`/custom-ais/${id}`);
  }

  // AI Attributes endpoints
  async getAiAttributes(category: string) {
    return this.request(`/ai-attributes/${category}`);
  }

  // Star packages endpoints
  async getStarPackages() {
    return this.request('/star-packages');
  }

  async getPopularStarPackages() {
    return this.request('/star-packages/popular');
  }

  async purchaseStarPackage(packageId: number, paymentMethodId: string) {
    return this.request(`/star-packages/${packageId}/purchase`, {
      method: 'POST',
      body: JSON.stringify({ payment_method_id: paymentMethodId }),
    });
  }

  // Image generation endpoints
  async createGeneration(generationData: {
    prompt: string;
    companion_id?: number;
    custom_ai_id?: number;
    tags?: string[];
    number_of_pictures: number;
    character_type: 'existing' | 'new';
    quality?: 'low' | 'medium' | 'high' | 'ultra';
    style?: 'realistic' | 'anime' | 'artistic' | 'nsfw';
    width?: number;
    height?: number;
  }) {
    return this.request('/generations', {
      method: 'POST',
      body: JSON.stringify(generationData),
    });
  }

  async getGenerations() {
    return this.request('/generations');
  }

  async getGeneration(id: number) {
    return this.request(`/generations/${id}`);
  }

  async getGenerationStatus(id: number) {
    return this.request(`/generations/${id}/status`);
  }

  // Eggplant rating endpoints
  async submitEggplantRating(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}/eggplant-ratings`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  }

  async getEggplantRatings() {
    return this.request('/eggplant-ratings');
  }

  async getEggplantRating(id: number) {
    return this.request(`/eggplant-ratings/${id}`);
  }

  async getEggplantRatingStatus(id: number) {
    return this.request(`/eggplant-ratings/${id}/status`);
  }

  // Conversations endpoints
  async getConversations() {
    return this.request('/conversations');
  }

  async createConversation(data: { companion_id: number; title?: string }) {
    return this.request('/conversations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getConversationMessages(conversationId: number) {
    return this.request(`/conversations/${conversationId}/messages`);
  }

  async sendMessage(conversationId: number, content: string, metadata?: any) {
    return this.request(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, metadata }),
    });
  }

  // Gallery endpoints
  async getGallery(params?: { favorites_only?: boolean; search?: string; tags?: string[] }) {
    const queryParams = new URLSearchParams();
    if (params?.favorites_only) queryParams.append('favorites_only', 'true');
    if (params?.search) queryParams.append('search', params.search);
    if (params?.tags) params.tags.forEach(tag => queryParams.append('tags[]', tag));

    const query = queryParams.toString();
    return this.request(`/gallery${query ? `?${query}` : ''}`);
  }

  async getPublicGallery(params?: { search?: string; tags?: string[] }) {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.tags) params.tags.forEach(tag => queryParams.append('tags[]', tag));

    const query = queryParams.toString();
    return this.request(`/gallery/public${query ? `?${query}` : ''}`);
  }

  // User endpoints
  async getUserDashboard() {
    return this.request('/user/dashboard');
  }

  async getUserStatistics() {
    return this.request('/user/statistics');
  }

  // Affiliate endpoints
  async getAffiliateProfile() {
    return this.request('/affiliate/profile');
  }

  async createAffiliateProfile(data: { payment_method: string; payment_details: string }) {
    return this.request('/affiliate/profile', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAffiliateCommissions() {
    return this.request('/affiliate/commissions');
  }

  async getAffiliateStatistics() {
    return this.request('/affiliate/statistics');
  }

  // Voice calls endpoints
  async getVoiceCalls() {
    return this.request('/voice-calls');
  }

  async initiateVoiceCall(data: {
    companion_id?: number;
    custom_ai_id?: number;
    call_type: 'voice' | 'video';
  }) {
    return this.request('/voice-calls', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Video conversion endpoints
  async convertPictureToVideo(imageFile: File, animationStyle?: string) {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (animationStyle) formData.append('animation_style', animationStyle);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}/video-conversions`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  }

  async getVideoConversions() {
    return this.request('/video-conversions');
  }

  async getVideoConversion(id: number) {
    return this.request(`/video-conversions/${id}`);
  }

  async getVideoConversionStatus(id: number) {
    return this.request(`/video-conversions/${id}/status`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export type { ApiResponse };
