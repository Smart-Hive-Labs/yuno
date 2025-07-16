# Yuno

Yuno is a mobile application designed for students to connect with their school communities, share educational content (videos, images, text), view class updates, participate in community Q&A, and manage academic tasks via a planner. It features a TikTok-like vertical video feed restricted to educational content, with a local-first architecture using **Expo SQLite** for offline functionality and **Supabase** for cloud syncing and media storage. Built with **Expo SDK 51**, **TypeScript**, and **Expo Router**, Yuno emphasizes a vibrant, student-friendly UI with a blue/white color scheme.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Setup Instructions](#setup-instructions)
- [Development Guidelines](#development-guidelines)
- [Color Usage Guide](#color-usage-guide)
- [Database Structure](#database-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Yuno is a social and academic platform for students to:
- Share educational videos, images, and text in a TikTok-like feed.
- Join school-specific communities for Q&A and collaboration.
- View class announcements and updates.
- Manage tasks and exams with a personal planner.
- Engage with profiles, search, and messaging features.

The app prioritizes offline functionality via **Expo SQLite** (`yuno.db`) and syncs data with **Supabase** when online. It uses **expo-av@14.0.7** for video/audio handling and **Zustand** for state management. Navigation is handled by **Expo Router** with a tab-based layout and stack/modal flows.

## Features

- **Home Feed**: Fullscreen, swipeable video feed with likes, comments, and sharing.
- **Discover**: Explore trending topics, schools, and hashtags.
- **Upload**: Record or upload educational content with editing and preview.
- **Planner**: Manage academic tasks with calendar/list views and notifications.
- **Profile**: View/edit user profiles, posts, and saved content.
- **Community**: Join study groups, post Q&A, and collaborate.
- **Class Feed**: View school-specific announcements.
- **Authentication**: Sign up, log in, and onboard with school selection.
- **Search & Messaging**: Search for content/users and send direct messages.
- **Modals**: Comment, share, and report functionality.

## System Architecture

### Technology Stack
- **Frontend**: React Native, Expo SDK 51, TypeScript, Expo Router.
- **Database**:
  - **Local**: Expo SQLite (`yuno.db`) for offline storage of users, posts, schools, updates, and community data.
  - **Cloud**: Supabase Postgres with Row Level Security (RLS) for centralized data and authentication.
- **Media Storage**: Supabase Storage (`avatars`, `school_logos`, `post_content`) and local storage via `expo-file-system`.
- **Video/Audio**: `expo-av@14.0.7` for video playback/recording.
- **State Management**: Zustand for lightweight state management.
- **Networking**: `expo-network` for connectivity detection; Supabase for real-time updates.
- **Notifications**: `expo-notifications` for push notifications.

### Local-First Architecture
- **Offline Mode**: All CRUD operations use SQLite; media stored in `FileSystem.documentDirectory + 'yuno_media/'`.
- **Syncing**: Sync queue tracks changes via `last_synced` timestamps, syncing with Supabase when online.
- **Conflict Resolution**: Server precedence or `created_at` timestamps for conflicts.

### Navigation
- **Structure**: Expo Router with:
  - **Tabs**: Home, Discover, Upload, Planner, Profile (`app/(tabs)/`).
  - **Stacks**: Post creation, authentication, community, class feed, settings, profiles, search, messages.
  - **Modals**: Comments, share, report (`app/modals/`).

## Folder Structure

```
yuno/
├── app/
│   ├── _layout.tsx                        # Root stack layout
│   ├── (tabs)/                            # Bottom tab navigation
│   │   ├── _layout.tsx                    # Tab layout (Home, Discover, Upload, Planner, Profile)
│   │   ├── index.tsx                      # Home Feed
│   │   ├── discover.tsx                   # Explore screen
│   │   ├── upload.tsx                     # Create video entry point
│   │   ├── planner.tsx                    # Student planner/timetable
│   │   ├── profile.tsx                    # User profile
│   ├── post/                              # Post creation flow
│   │   ├── create.tsx                     # Record/upload video
│   │   ├── edit.tsx                       # Add caption/tags
│   │   ├── preview.tsx                    # Preview before posting
│   │   └── [postId]/index.tsx             # View single post
│   ├── auth/                              # Authentication flow
│   │   ├── login.tsx                      # Login screen
│   │   ├── signup.tsx                     # Signup screen
│   │   ├── forgot-password.tsx            # Password reset
│   │   ├── onboarding.tsx                 # School selection
│   ├── community/                         # Study groups & Q&A
│   │   ├── index.tsx                      # Communities list
│   │   ├── [groupId]/index.tsx            # Community page
│   │   └── [groupId]/thread/[threadId].tsx# Thread/Q&A detail
│   ├── classfeed/                         # School announcements
│   │   └── index.tsx
│   ├── settings/                          # App settings
│   │   ├── index.tsx                      # Settings overview
│   │   └── notifications.tsx              # Notification preferences
│   ├── profile/                           # Other users’ profiles
│   │   └── [username]/index.tsx
│   ├── search/                            # Search functionality
│   │   └── index.tsx
│   ├── messages/                          # Direct messaging
│   │   ├── index.tsx                      # Chat list
│   │   └── [chatId].tsx                   # Chat conversation
│   ├── modals/                            # Modal screens
│   │   ├── comments.tsx                   # Post comments
│   │   ├── share.tsx                      # Share post
│   │   ├── report.tsx                     # Report post/user
│   ├── api/
│   │   ├── supabase/                      # Supabase client & queries
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── posts.ts
│   │   │   ├── schools.ts
│   │   │   ├── updates.ts
│   │   │   ├── community.ts
│   │   ├── sqlite/                        # SQLite database operations
│   │   │   ├── db.ts
│   │   │   ├── schema.ts
│   │   │   ├── queries/
│   │   │   │   ├── users.ts
│   │   │   │   ├── posts.ts
│   │   │   │   ├── schools.ts
│   │   │   │   ├── updates.ts
│   │   │   │   ├── community.ts
│   │   │   │   ├── planner.ts
│   │   ├── sync.ts                        # Sync logic
│   ├── components/
│   │   ├── video/                         # Video-related components
│   │   │   ├── VideoPlayer.tsx
│   │   │   ├── MuteButton.tsx
│   │   ├── feed/                          # Feed components
│   │   │   ├── PostCard.tsx
│   │   │   ├── UpdateCard.tsx
│   │   ├── ui/                            # Generic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Avatar.tsx
│   │   ├── layout/                        # Navigation components
│   │   │   ├── TabBar.tsx
│   │   │   ├── Header.tsx
│   │   ├── community/                     # Community components
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── AnswerCard.tsx
│   ├── hooks/                             # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useUpload.ts
│   │   ├── useFeed.ts
│   │   ├── useCommunity.ts
│   │   ├── usePlanner.ts
│   ├── context/                           # React context
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   ├── store/                             # Zustand state management
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── user.ts
│   │   │   ├── feed.ts
│   │   │   ├── planner.ts
│   ├── constants/                         # App constants
│   │   ├── colors.ts
│   ├── utils/                             # Utility functions
│   │   ├── media.ts
│   │   ├── validation.ts
│   │   ├── format.ts
│   │   ├── date.ts
│   ├── types/                             # TypeScript types
│   │   ├── user.d.ts
│   │   ├── post.d.ts
│   │   ├── comment.d.ts
│   │   ├── planner.d.ts
│   │   ├── community.d.ts
│   ├── assets/                            # Static assets
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   │   ├── yuno_logo.png
├── app.json
├── tsconfig.json
├── babel.config.js
├── package.json
├── .eslintrc.js
├── .prettierrc
├── README.md
```

## Setup Instructions

1. **Initialize Project**:
   ```bash
    yarn install
   ```


2. **Set Up Database and Sync**:
   - Initialize SQLite in `app/api/sqlite/db.ts` and `schema.ts` (see [Database Structure](#database-structure)).
   - Configure Supabase in `app/api/supabase/client.ts` with your Supabase URL and anon key.
   - Implement sync logic in `app/api/sync.ts` to handle SQLite-Supabase syncing.

3. **Run Development Server**:
   ```bash
   npx expo start
   ```
   Use Expo Go for rapid iteration or create a development build with `expo-dev-client`.

4. **Build and Deploy**:
   - Create production builds with EAS Build:
     ```bash
     eas build
     ```
   - Enable OTA updates for JavaScript changes.
   - Submit to App Store/Google Play via EAS Submit:
     ```bash
     eas submit --platform ios
     eas submit --platform android
     ```

## Development Guidelines

- **Local-First**:
  - Use SQLite (`app/api/sqlite/`) for all CRUD operations.
  - Store media in `FileSystem.documentDirectory + 'yuno_media/'` for offline access.
  - Implement sync logic in `app/api/sync.ts` using `last_synced` timestamps and `expo-network`.

- **Video/Audio**:
  - Use `expo-video` for video playback (`components/video/VideoPlayer.tsx`) and recording (`app/post/create.tsx`).
  - Optimize video compression for storage and bandwidth.

- **Navigation**:
  - Leverage Expo Router’s file-based routing (`app/(tabs)/`, `app/post/`, etc.).
  - Use `components/layout/TabBar.tsx` for custom tab bar styling.
  - Implement modals (`app/modals/`) for comments, sharing, and reporting.

- **State Management**:
  - Use Zustand (`app/store/`) for managing user, feed, and planner state.
  - Avoid overusing global state; prefer local component state where possible.

- **Branding**:
  - Apply Yuno color scheme (see [Color Usage Guide](#color-usage-guide)).
  - Use `yuno-logo-mark.png` in `app/assets/images/` for splash screen and branding.
  - Load custom fonts in `app/assets/fonts/` with `expo-font`.

- **Testing**:
  - Test offline functionality (feed, post creation, planner).
  - Verify video playback/recording in Expo Go and development builds.
  - Simulate network changes to ensure sync reliability.
  - Use ESLint and Prettier for code quality.

- **Security**:
  - Validate educational content client-side (`app/utils/validation.ts`).
  - Use Supabase RLS for server-side data access control.
  - Encrypt sensitive data in SQLite if needed.
  - Align with FERPA for student data protection.

- **Moderation**:
  - Implement keyword filtering for `is_educational` flag in `Posts`.
  - Use Supabase functions for manual review of flagged content.
  - Handle user reports via `app/modals/report.tsx`.

## Color Usage Guide

Yuno uses a vibrant color scheme for light and dark modes, defined in `app/constants/colors.ts`. Apply these colors consistently across the app for branding.

| Element | Dark Mode Color | Light Mode Color | Usage |
|---------|-----------------|------------------|-------|
| Background | `#0B0617` | `#FFFFFF` | App background, tab bar, scrollable views |
| Primary Buttons | `#00C3FF` | `#00B2E3` | Primary buttons, active tab icons, progress bars, FAB |
| Secondary Buttons | `#CE31FF` | `#B02AD9` | Secondary buttons, hover states, tag labels |
| Like/Favorite Icon | `#FF2DAF` | `#E02497` | Like button, reactions, CTA highlights |
| Alerts/Badges | `#FFA928` | `#E89620` | Notifications, warnings, live tags |
| Gradient Swipe/Border | `#FF5E6C` | `#E5535F` | Gradients, swipe trails |
| Text Primary | `#FFFFFF` | `#000000` | Body text, button text, headings |
| Text Secondary | `rgba(255,255,255,0.7)` | `rgba(0,0,0,0.7)` | Subtitles, labels |
| Disabled/Placeholder | `rgba(255,255,255,0.4)` | `rgba(0,0,0,0.4)` | Disabled buttons, placeholders |

**Gradient Buttons**:
- Use `linear-gradient(90deg, #00C3FF 0%, #FF2DAF 100%)` for CTA buttons, FAB, and highlights.
- Use `#FFFFFF` text on gradient backgrounds.

## Database Structure

### Local Database: Expo SQLite
- **File**: `yuno.db` (via `expo-sqlite`).
- **Purpose**: Offline storage for users, posts, schools, updates, and community data.
- **Tables**:
  1. **Users**: `id`, `email`, `username`, `full_name`, `avatar_url`, `last_synced`.
  2. **Schools**: `school_id`, `name`, `location`, `description`, `logo_url`, `last_synced`.
  3. **User_Schools**: `id`, `user_id`, `school_id`, `joined_at`, `last_synced`.
  4. **Posts**: `post_id`, `user_id`, `school_id`, `content_type`, `content_url`, `caption`, `tags`, `is_educational`, `created_at`, `last_synced`.
  5. **Class_Updates**: `update_id`, `school_id`, `user_id`, `title`, `content`, `created_at`, `last_synced`.
  6. **Comments**: `comment_id`, `post_id`, `user_id`, `content`, `created_at`, `last_synced`.
  7. **Likes**: `like_id`, `post_id`, `user_id`, `created_at`, `last_synced`.
  8. **Community_Help**: `help_id`, `user_id`, `school_id`, `group_id`, `question`, `status`, `created_at`, `last_synced`.
  9. **Community_Answers**: `answer_id`, `help_id`, `user_id`, `content`, `created_at`, `last_synced`.
  10. **Community_Groups**: `group_id`, `school_id`, `name`, `description`, `member_count`, `created_at`, `last_synced`.

### Cloud Database: Supabase Postgres
- **Purpose**: Centralized storage for authentication, media, and syncing.
- **Tables**: Mirror SQLite structure with UUIDs and RLS.
- **Storage Buckets**:
  - `avatars`: User profile photos.
  - `school_logos`: School logos.
  - `post_content`: Videos and images.
- **RLS Policies**:
  - Users access own data (`id = auth.uid()`).
  - Posts/updates accessible to school members.
  - Media uploads restricted to authenticated users.

### Local File Storage
- **Directory**: `FileSystem.documentDirectory + 'yuno_media/'`.
- **Purpose**: Store videos/images for offline access.
- **Sync**: Upload to Supabase Storage when online, update `content_url`.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m "Add YourFeature"`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

Follow coding standards:
- Use TypeScript with strict mode.
- Run ESLint (`npm run lint`) and Prettier (`npm run format`) before committing.
- Write unit tests for critical components (`app/api/`, `app/utils/`).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.