# Quick Supabase Setup - Fix "table not found" Error

## The Error
```
{"error":"Could not find the table 'public.activities' in the schema cache"}
```

This means the tables haven't been created in Supabase yet.

## Solution: Create Tables in Supabase

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project (or create a new one)

### Step 2: Open SQL Editor
1. Click **SQL Editor** in the left sidebar
2. Click **New Query** button (top right)

### Step 3: Run the Schema
1. Open the file: `server/supabase-schema.sql`
2. **Copy ALL the contents** of that file
3. **Paste it into the SQL Editor** in Supabase
4. Click **Run** (or press Cmd/Ctrl + Enter)

### Step 4: Verify Tables Were Created
1. Go to **Table Editor** in the left sidebar
2. You should see two tables:
   - ✅ `activities`
   - ✅ `activity_logs`

### Step 5: Test Your API
Restart your server and try again:

```bash
cd server
npm run dev
```

Then test:
```bash
curl http://localhost:5000/api/activities
```

## Alternative: Use Supabase Table Editor (GUI)

If SQL doesn't work, create tables manually:

### Create `activities` table:
1. Go to **Table Editor** → **New Table**
2. Table name: `activities`
3. Add columns:
   - `id` - UUID, Primary Key, Default: `gen_random_uuid()`
   - `name` - text, NOT NULL
   - `description` - text, nullable
   - `color` - text, NOT NULL
   - `icon` - text, nullable
   - `created_at` - timestamptz, Default: `now()`
4. Click **Save**

### Create `activity_logs` table:
1. Go to **Table Editor** → **New Table**
2. Table name: `activity_logs`
3. Add columns:
   - `id` - UUID, Primary Key, Default: `gen_random_uuid()`
   - `activity_id` - UUID, Foreign Key → `activities.id`, ON DELETE CASCADE
   - `date` - date, NOT NULL
   - `completed` - boolean, NOT NULL, Default: `false`
   - `notes` - text, nullable
   - `created_at` - timestamptz, Default: `now()`
   - `updated_at` - timestamptz, Default: `now()`
4. Add unique constraint: `activity_id` + `date`
5. Click **Save**

### Enable RLS (Row Level Security):
1. Go to **Authentication** → **Policies**
2. For `activities` table:
   - Create policy: Allow all operations for anon users
3. For `activity_logs` table:
   - Create policy: Allow all operations for anon users

## Still Having Issues?

1. **Check your .env file** - Make sure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
2. **Check Supabase project** - Make sure you're using the right project
3. **Check API keys** - Go to Settings → API and verify your keys match

