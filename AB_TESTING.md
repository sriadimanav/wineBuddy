# A/B Testing - Complete Guide 🧪

## What is A/B Testing?

**A/B Testing** (also called split testing) is a method of comparing two
versions of a webpage, app feature, or user interface to determine which one
performs better. It's like conducting a controlled experiment where you show
different versions to different groups of users and measure which version
achieves better results.

## 🎯 How A/B Testing Works

### Basic Concept

```
Users visit your app
         ↓
    Split randomly
    ↙         ↘
Version A    Version B
(Control)    (Variant)
    ↓           ↓
Measure     Measure
Results     Results
    ↘         ↙
   Compare Performance
```

### Example in Wine Buddy Context

**Scenario**: Testing which button color gets more users to add wines to
favorites

```typescript
// Version A (Control) - Red button
<button className="bg-red-500 text-white">
  Add to Favorites
</button>

// Version B (Variant) - Blue button
<button className="bg-blue-500 text-white">
  Add to Favorites
</button>
```

**Process**:

1. 50% of users see the red button (Version A)
2. 50% of users see the blue button (Version B)
3. Track which button gets clicked more often
4. After collecting enough data, determine the winner

## 🛠️ Implementation in Wine Buddy

### 1. Basic A/B Testing Hook

```typescript
// Custom hook for A/B testing
function useABTest(
  testName: string,
  variants: string[],
  defaultVariant?: string,
) {
  const [variant, setVariant] = useState<string>(defaultVariant || variants[0]);

  useEffect(() => {
    // Get or assign user to a variant
    let userVariant = localStorage.getItem(`ab_test_${testName}`);

    if (!userVariant) {
      // Randomly assign user to a variant
      userVariant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem(`ab_test_${testName}`, userVariant);
    }

    setVariant(userVariant);

    // Track the assignment
    analytics.track('ab_test_assigned', {
      test_name: testName,
      variant: userVariant,
      user_id: getCurrentUserId(),
    });
  }, [testName, variants]);

  const trackConversion = useCallback(
    (conversionEvent: string) => {
      analytics.track('ab_test_conversion', {
        test_name: testName,
        variant,
        conversion_event: conversionEvent,
        user_id: getCurrentUserId(),
      });
    },
    [testName, variant],
  );

  return { variant, trackConversion };
}
```

### 2. Using A/B Testing in Components

```typescript
// Testing different wine card layouts
function WineCard({ wine }: { wine: Wine }) {
  const { variant, trackConversion } = useABTest('wine_card_layout', ['compact', 'detailed']);

  const handleAddToFavorites = () => {
    addToFavorites(wine.id);
    trackConversion('add_to_favorites'); // Track the conversion
  };

  if (variant === 'compact') {
    return (
      <div className="wine-card-compact">
        <img src={wine.image} alt={wine.name} />
        <h3>{wine.name}</h3>
        <button onClick={handleAddToFavorites}>♥</button>
      </div>
    );
  }

  // Detailed version
  return (
    <div className="wine-card-detailed">
      <img src={wine.image} alt={wine.name} />
      <div className="wine-info">
        <h3>{wine.name}</h3>
        <p>{wine.winery}</p>
        <p>{wine.region}</p>
        <div className="rating">★★★★☆</div>
      </div>
      <button onClick={handleAddToFavorites}>
        Add to Favorites
      </button>
    </div>
  );
}
```

### 3. Testing Different User Flows

```typescript
// Testing different onboarding flows
function OnboardingScreen() {
  const { variant } = useABTest('onboarding_flow', ['3_steps', '5_steps']);

  if (variant === '3_steps') {
    return <ThreeStepOnboarding />;
  }

  return <FiveStepOnboarding />;
}

// Testing different scanning instructions
function ScanInstructions() {
  const { variant, trackConversion } = useABTest('scan_instructions',
    ['text_only', 'with_animation', 'with_video']
  );

  const handleStartScan = () => {
    trackConversion('scan_started');
    startScanning();
  };

  return (
    <div>
      {variant === 'text_only' && <TextInstructions />}
      {variant === 'with_animation' && <AnimatedInstructions />}
      {variant === 'with_video' && <VideoInstructions />}

      <button onClick={handleStartScan}>
        Start Scanning
      </button>
    </div>
  );
}
```

## 📊 Real-World Examples

### 1. **Netflix**

- **Test**: Different thumbnail images for movies
- **Result**: Personalized thumbnails increased viewing by 20%

### 2. **Spotify**

- **Test**: "Shuffle" vs "Play" as the primary button
- **Result**: "Shuffle" increased user engagement by 30%

### 3. **Airbnb**

- **Test**: Different search result layouts
- **Result**: Grid view increased bookings by 12%

## 🎯 Common A/B Tests for Wine Buddy

### 1. **Button Variations**

```typescript
// Test: Primary button styles
const buttonTests = {
  color: ['red', 'blue', 'green', 'purple'],
  text: ['Add to Favorites', 'Save Wine', '♥ Favorite', '+ Add'],
  size: ['small', 'medium', 'large'],
  style: ['solid', 'outline', 'gradient'],
};
```

### 2. **Layout Tests**

```typescript
// Test: Wine card layouts
const layoutTests = {
  wine_card: ['horizontal', 'vertical', 'grid'],
  home_screen: ['carousel', 'grid', 'list'],
  navigation: ['bottom_tabs', 'side_menu', 'top_tabs'],
};
```

### 3. **Content Tests**

```typescript
// Test: Different headlines
const contentTests = {
  homepage_headline: [
    'Discover Your Perfect Wine',
    "Find Amazing Wines You'll Love",
    'Your Wine Journey Starts Here',
  ],
  scan_cta: ['Scan Wine Label', 'Identify This Wine', 'What Wine Is This?'],
};
```

### 4. **User Experience Tests**

```typescript
// Test: Onboarding variations
const uxTests = {
  onboarding_length: ['skip_option', 'required_3_steps', 'required_5_steps'],
  search_behavior: ['auto_suggestions', 'manual_only', 'voice_enabled'],
  gamification: ['badges_only', 'points_system', 'leaderboards'],
};
```

## 📈 Measuring Success

### Key Metrics to Track

```typescript
interface ABTestMetrics {
  // Conversion Metrics
  conversion_rate: number; // % users who completed desired action
  click_through_rate: number; // % users who clicked
  signup_rate: number; // % users who signed up

  // Engagement Metrics
  time_on_page: number; // Average time spent
  pages_per_session: number; // Pages viewed per visit
  bounce_rate: number; // % users who left immediately

  // Business Metrics
  revenue_per_user: number; // Money generated per user
  lifetime_value: number; // Long-term user value
  retention_rate: number; // % users who return
}

// Example tracking
function trackABTestResults(
  testName: string,
  variant: string,
  metrics: ABTestMetrics,
) {
  analytics.track('ab_test_results', {
    test_name: testName,
    variant,
    ...metrics,
    timestamp: new Date().toISOString(),
  });
}
```

### Sample Results Analysis

```typescript
// Example A/B test results for Wine Buddy
const testResults = {
  test_name: 'add_to_favorites_button',
  variants: {
    red_button: {
      users: 1000,
      conversions: 150,
      conversion_rate: 15.0,
      confidence: 95,
    },
    blue_button: {
      users: 1000,
      conversions: 180,
      conversion_rate: 18.0,
      confidence: 95,
    },
  },
  winner: 'blue_button',
  improvement: '20% increase in conversions',
};
```

## 🎯 A/B Testing Best Practices

### 1. **Statistical Significance**

```typescript
// Don't conclude tests too early
function isTestReady(testData: ABTestData): boolean {
  const minSampleSize = 1000; // per variant
  const minDuration = 7; // days
  const confidenceLevel = 95; // percent

  return (
    testData.sample_size >= minSampleSize &&
    testData.duration_days >= minDuration &&
    testData.confidence >= confidenceLevel
  );
}
```

### 2. **One Test at a Time**

```typescript
// Avoid testing multiple elements simultaneously
// ❌ Bad: Testing button color AND layout simultaneously
// ✅ Good: Test button color first, then layout
```

### 3. **Clear Hypothesis**

```typescript
interface ABTestHypothesis {
  what: string; // "Changing button color from red to blue"
  why: string; // "Blue is more trustworthy and calming"
  expected_outcome: string; // "Will increase add-to-favorites by 15%"
  success_metric: string; // "Conversion rate on favorites button"
}
```

## 🚀 Advanced A/B Testing

### 1. **Multivariate Testing**

```typescript
// Testing multiple variables simultaneously
function useMultivariateTest() {
  const buttonColor = useABTest('button_color', ['red', 'blue']);
  const buttonText = useABTest('button_text', ['Add', 'Save']);
  const buttonSize = useABTest('button_size', ['small', 'large']);

  return {
    className: `btn-${buttonColor}-${buttonSize}`,
    text: buttonText === 'Add' ? 'Add to Favorites' : 'Save Wine',
  };
}
```

### 2. **Personalized Testing**

```typescript
// Different tests for different user segments
function usePersonalizedABTest(userSegment: string) {
  const testConfig = {
    new_users: { test: 'onboarding_flow', variants: ['simple', 'detailed'] },
    power_users: {
      test: 'advanced_features',
      variants: ['enabled', 'disabled'],
    },
    casual_users: { test: 'gamification', variants: ['basic', 'advanced'] },
  };

  const config = testConfig[userSegment];
  return useABTest(config.test, config.variants);
}
```

### 3. **A/B Testing Framework**

```typescript
class ABTestingFramework {
  private experiments: Map<string, Experiment> = new Map();

  createExperiment(config: ExperimentConfig): string {
    const experiment = new Experiment(config);
    this.experiments.set(config.name, experiment);
    return config.name;
  }

  getVariant(experimentName: string, userId: string): string {
    const experiment = this.experiments.get(experimentName);
    return experiment?.getVariantForUser(userId) || 'control';
  }

  trackConversion(experimentName: string, userId: string, event: string) {
    const experiment = this.experiments.get(experimentName);
    experiment?.trackConversion(userId, event);
  }

  getResults(experimentName: string): ExperimentResults {
    const experiment = this.experiments.get(experimentName);
    return experiment?.getResults() || null;
  }
}
```

## 🎯 Wine Buddy Specific A/B Test Ideas

### 1. **Scan Flow Optimization**

```typescript
// Test different scanning instructions
const scanTests = [
  'minimal_instructions', // Just "Point camera at label"
  'detailed_instructions', // Step-by-step guide
  'video_tutorial', // Video showing how to scan
  'interactive_guide', // Hand-holding first scan
];
```

### 2. **Wine Discovery**

```typescript
// Test different ways to show wine recommendations
const discoveryTests = [
  'algorithm_based', // AI recommendations
  'trending_wines', // Popular wines
  'sommelier_picks', // Expert recommendations
  'social_recommendations', // What friends like
];
```

### 3. **Gamification Elements**

```typescript
// Test different achievement systems
const gamificationTests = [
  'badges_only', // Simple badge collection
  'points_system', // Points + leaderboards
  'streak_focused', // Daily scanning streaks
  'social_challenges', // Compete with friends
];
```

## 📊 Tools for A/B Testing

### 1. **Analytics Platforms**

- **Google Analytics 4** - Free A/B testing
- **Mixpanel** - Advanced user analytics
- **Amplitude** - Product analytics

### 2. **Dedicated A/B Testing Tools**

- **Optimizely** - Enterprise solution
- **VWO** - Visual testing platform
- **Split.io** - Feature flagging + A/B testing

### 3. **Custom Implementation**

```typescript
// Simple custom A/B testing service
class CustomABTesting {
  static assignVariant(testName: string, variants: string[]): string {
    const userId = getCurrentUserId();
    const hash = this.hashUser(userId + testName);
    const variantIndex = hash % variants.length;
    return variants[variantIndex];
  }

  private static hashUser(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}
```

## 🎯 Conclusion

A/B testing is a powerful method to:

- **Make data-driven decisions** instead of guessing
- **Optimize user experience** based on real behavior
- **Increase conversions** and business metrics
- **Reduce risk** when making changes

For Wine Buddy, A/B testing can help optimize everything from button colors to
entire user flows, ensuring that every change improves the user experience and
business outcomes.

**Key Takeaway**: Always test, measure, and iterate based on real user data
rather than assumptions!
